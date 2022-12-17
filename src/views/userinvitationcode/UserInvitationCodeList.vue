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
          <img class="code-img" src="../../assets/icon/CodeImg.svg" alt="">
          <div class="code-btn" style="background: #49B1B3;color: #fff;">下载到本地</div>
        </div>
        <div>
          <img class="code-img" src="../../assets/icon/CodeImg2.svg" alt="">
          <div class="code-btn main-color" >扫一扫，手机查看</div>
        </div>
      </div>
    </a-modal>

    <!-- 操作按钮区域 -->
<!--    <div class="table-operator">
      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
      <a-button type="primary" icon="download" @click="handleExportXls('用户推广邀请码')">导出</a-button>
      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">
        <a-button type="primary" icon="import">导入</a-button>
      </a-upload>-->
      <!-- 高级查询区域 -->
<!--      <j-super-query :fieldList="superFieldList" ref="superQueryModal" @handleSuperQuery="handleSuperQuery"></j-super-query>-->
<!--      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>-->
<!--    </div>-->


    <!-- table区域-begin -->
<!--    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        :scroll="{x:true}"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        class="j-table-force-nowrap"
        @change="handleTableChange">

        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text,record">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img v-else :src="getImgView(text)" :preview="record.id" height="25px" alt="" style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="downloadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleDetail(record)">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>-->

<!--    <user-invitation-code-modal ref="modalForm" @ok="modalFormOk"></user-invitation-code-modal>-->
  </div>
</template>

<script>
import { httpAction, getAction } from '@/api/manage'
  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import UserInvitationCodeModal from './modules/UserInvitationCodeModal'

  export default {
    name: 'UserInvitationCodeList',
    mixins:[JeecgListMixin, mixinDevice],
    components: {
      UserInvitationCodeModal
    },
    data () {
      return {
        description: '用户推广邀请码管理页面',
        // 表头
        columns: [
          // {
          //   title: '#',
          //   dataIndex: '',
          //   key:'rowIndex',
          //   width:60,
          //   align:"center",
          //   customRender:function (t,r,index) {
          //     return parseInt(index)+1;
          //   }
          // },
          // {
          //   title:'用户名',
          //   align:"center",
          //   dataIndex: 'userName'
          // },
          // {
          //   title:'区号',
          //   align:"center",
          //   dataIndex: 'areaCode'
          // },
          // {
          //   title:'手机号',
          //   align:"center",
          //   dataIndex: 'phoneNo'
          // },
          // {
          //   title:'密码',
          //   align:"center",
          //   dataIndex: 'loginPassword'
          // },
          // {
          //   title:'交易密码',
          //   align:"center",
          //   dataIndex: 'tradePassword'
          // },
          // {
          //   title:'头像链接',
          //   align:"center",
          //   dataIndex: 'headPortraitUrl'
          // },
          // {
          //   title:'邮箱',
          //   align:"center",
          //   dataIndex: 'mail'
          // },
          // {
          //   title:'父级id',
          //   align:"center",
          //   dataIndex: 'parentId'
          // },
          // {
          //   title:'父级id( 1,2,3,4,5)',
          //   align:"center",
          //   dataIndex: 'parentIds'
          // },
          {
            title:'邀请码',
            align:"center",
            dataIndex: 'invitationCode'
          },
          // {
          //   title:'谷歌验证是否开启：0：禁用，1开启',
          //   align:"center",
          //   dataIndex: 'googleStatus'
          // },
          // {
          //   title:'谷歌认证（秘钥）',
          //   align:"center",
          //   dataIndex: 'googleCode'
          // },
          // {
          //   title:'推荐类型(0: 普通用户,1: 商户)',
          //   align:"center",
          //   dataIndex: 'type'
          // },
          // {
          //   title:'是否允许登录(0: 否,1: 是)',
          //   align:"center",
          //   dataIndex: 'loginIs'
          // },
          // {
          //   title:'是否允许交易(0: 否,1: 是)',
          //   align:"center",
          //   dataIndex: 'tradeIs'
          // },
          // {
          //   title:'认证等级( 0：未认证, 1：基本信息认证 2：审核中, 3：已认证, 4：不通过)',
          //   align:"center",
          //   dataIndex: 'authorizeLevel'
          // },
          // {
          //   title:'账号状态：0：禁用，1：启用，2：禁止交易',
          //   align:"center",
          //   dataIndex: 'status'
          // },
          // {
          //   title:'uuid',
          //   align:"center",
          //   dataIndex: 'uuid'
          // },
          // {
          //   title:'orgCode',
          //   align:"center",
          //   dataIndex: 'orgCode'
          // },
          // {
          //   title: '操作',
          //   dataIndex: 'action',
          //   align:"center",
          //   fixed:"right",
          //   width:147,
          //   scopedSlots: { customRender: 'action' }
          // }
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