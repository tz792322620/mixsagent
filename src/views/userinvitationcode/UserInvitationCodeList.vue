<template>
  <div class="pa-6" >
    <!-- 查询区域 -->
<!--    <div class="table-page-search-wrapper">-->
<!--      <a-form layout="inline" @keyup.enter.native="searchQuery">-->
<!--        <a-row :gutter="24">-->
<!--        </a-row>-->
<!--      </a-form>-->
<!--    </div>-->
    <!-- 查询区域-END -->


    <div class="card pa-6">
      <div class="font-size-30 font-bold mb-6">推广链接</div>
      <div v-for="item in dataSource" style="box-shadow: 1px 2px 5px #ddd; border-radius: 8px;" class="pa-8 mb-6 d-flex justify-space-between align-center">
        <div>
          <div class="font-size-18 font-bold">全站APP版代理链接</div>
          <div class="primary-color font-size-16 mt-2">
            http://h5.mixs.me/#/?code={{item.invitationCode}}
          </div>
        </div>
        <div>
          <div class="mb-3">
            <!-- 二维码 -->
            <!-- 海报html元素 -->
            <div id="posterHtml" class="posterBox" :style="{backgroundImage: 'url(' + bgImgURL + ')' }">
<!--              <div class="posterContent">-->
<!--                {{contentData}}-->
<!--              </div>-->
              <!-- 二维码 -->
              <div class="qrcodeBox">
                <div id="qrcodeImg"></div>
              </div>
            </div>
            <img v-if="posterImgURL" class="posterBox" :src="posterImgURL" >
        </div>
        <div class="mb-3">

          <a-button
            type="primary" @click="copy()">复制
          </a-button>
        </div>
        <div class="mt-4">
        <a-button @click="modal = true">下载</a-button>
        </div>
      </div>
      </div>
    </div>

    <!-- 下载弹出层 -->
    <a-modal v-model="modal" :class="device" title="下载二维码" centered :footer="null" >
      <!-- 二维码显示区域 -->
      <div class="code-warp" >
        <div>
          <img class="code-img" :src="posterImgURL">
          <div class="code-btn" style="background: #49B1B3;color: #fff;" @click="downloadPoster(posterImgURL,'海报名称')">下载到本地</div>
        </div>
        <div>
          <img class="code-img" :src="posterImgURL">
          <div class="code-btn main-color" >扫一扫，手机查看</div>
        </div>
      </div>
    </a-modal>

  </div>
</template>

<script>
  import { httpAction, getAction } from '@/api/manage'
  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import UserInvitationCodeModal from './modules/UserInvitationCodeModal'
  import QRCode from 'qrcodejs2'
  import html2canvas from 'html2canvas'
  import bgImgURL from "../../assets/nodata.png";
  export default {
    name: 'UserInvitationCodeList',
    mixins:[JeecgListMixin, mixinDevice],
    components: {
      UserInvitationCodeModal
    },
    data () {
      return {
        bgImgURL: bgImgURL,
        contentData: '我是一张分享海报', // 文案内容
        posterImgURL: '', // 最终生成的海报图片URL
        description: '用户推广邀请码管理页面',
        // 表头
        columns: [
          {
            title:'邀请码',
            align:"center",
            dataIndex: 'invitationCode'
          },
        ],
        url: {
          list: "/userinvitationcode/userInvitationCode/list",
          delete: "/userinvitationcode/userInvitationCode/delete",
          deleteBatch: "/userinvitationcode/userInvitationCode/deleteBatch",
          exportXlsUrl: "/userinvitationcode/userInvitationCode/exportXls",
          importExcelUrl: "userinvitationcode/userInvitationCode/importExcel",

        },
        dictOptions:{},
        superFieldList:[],
        modal: false
      }
    },
    created() {
      this.getSuperFieldList();

    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      },
    },

    methods: {
      copy(){
        console.log(this.dataSource[0].invitationCode)
        let message = 'http://h5.mixs.me/#/?code='+this.dataSource[0].invitationCode
        this.$copyText(message).then(function (e) {
          alert('复制成功')
        }, function (e) {
          alert('复制失败')
        })
      },
      // 生成二维码
      createQrcode(text) {
        let message = 'http://h5.mixs.me/#/?code='
        let qrcodeImgEl = document.getElementById('qrcodeImg')
        qrcodeImgEl.innerHTML = ''
        let qrcode = new QRCode(qrcodeImgEl, {
          width: 100,
          height: 100,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        })
        qrcode.makeCode(message)
        this.createPoster()
      },
      // 生成海报
      createPoster() {
        let that = this
        let posterDOM = document.getElementById('posterHtml')
        html2canvas(posterDOM, {
          width: posterDOM.offsetWidth,
          height: posterDOM.offsetHeight,
          //按比例增加分辨率
          scale: window.devicePixelRatio, // 设备像素比
          useCORS: true,//（图片跨域相关）
          allowTaint: true,//允许跨域（图片跨域相关）
          logging: false,
          letterRendering: true,
        }).then(function (canvas) {
          that.posterImgURL = canvas.toDataURL('image/png')
        })
      },
      // 下载海报
      downloadPoster(url, fileName) {
        let a = document.createElement('a')
        a.setAttribute('download', '海报下载-' + new Date().getTime())
        a.href = url
        a.click()
      },
      handleData(val){
        this.message = this.message + ' ' + val
      },
      initDictConfig(){
      },
      getSuperFieldList(){
        let fieldList=[];
        fieldList.push({type:'string',value:'userName',text:'用户名'})
        fieldList.push({type:'string',value:'areaCode',text:'区号'})
        fieldList.push({type:'string',value:'phoneNo',text:'手机号'})
        fieldList.push({type:'string',value:'loginPassword',text:'密码'})
        fieldList.push({type:'string',value:'tradePassword',text:'交易密码'})
        fieldList.push({type:'string',value:'headPortraitUrl',text:'头像链接'})
        fieldList.push({type:'string',value:'mail',text:'邮箱'})
        fieldList.push({type:'string',value:'parentId',text:'父级id'})
        fieldList.push({type:'string',value:'parentIds',text:'父级id( 1,2,3,4,5)'})
        fieldList.push({type:'string',value:'invitationCode',text:'邀请码'})
        fieldList.push({type:'int',value:'googleStatus',text:'谷歌验证是否开启：0：禁用，1开启'})
        fieldList.push({type:'string',value:'googleCode',text:'谷歌认证（秘钥）'})
        fieldList.push({type:'int',value:'type',text:'推荐类型(0: 普通用户,1: 商户)'})
        fieldList.push({type:'int',value:'loginIs',text:'是否允许登录(0: 否,1: 是)'})
        fieldList.push({type:'int',value:'tradeIs',text:'是否允许交易(0: 否,1: 是)'})
        fieldList.push({type:'int',value:'authorizeLevel',text:'认证等级( 0：未认证, 1：基本信息认证 2：审核中, 3：已认证, 4：不通过)'})
        fieldList.push({type:'int',value:'status',text:'账号状态：0：禁用，1：启用，2：禁止交易'})
        fieldList.push({type:'string',value:'uuid',text:'uuid'})
        fieldList.push({type:'string',value:'orgCode',text:'orgCode'})
        this.superFieldList = fieldList

        this.createQrcode();
      }
    }
  }
</script>
<style scoped lang="less">
  @import '~@assets/less/common.less';
.mobile .d-flex {
    display: -ms-flexbox;
    display: block;
}

.mobile .float-search-btn {
    position: inherit;
    margin-top: 10px;
}



  .primary-color {
    color: @primary-color;
  }
  .code-warp{
    display: flex;
    justify-content: space-between;
    .code-img{
      width: 200px;
    }
    .code-btn{
      text-align: center;
      border: 1px solid ;
      border-radius: 10px;
      padding: 4px;
      // color: #fff;
      margin-top: 15px;
      border-radius: 20px;
      border: 1px solid #49B1B3;
      cursor: pointer;
    }
  }

  .mobile .code-warp{
    display: grid !important;
  }

</style>