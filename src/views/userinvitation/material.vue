<template>
  <div class="pa-6">

    <div class="card pa-6">
      <div class="font-size-30 font-bold mb-6">推广素材</div>

      <div class="d-flex">
        <div class="d-flex align-center">
          <div class="min-width-80px search-label">图片标题：</div>
          <a-input placeholder="请输入图片标题" />
        </div>
        <div class="px-6"></div>
        <div class="d-flex align-center">
          <div class="min-width-80px search-label">图片类型：</div>
          <a-select default-value="all" style="width: 180px">
            <a-select-option value="all">
             全部
            </a-select-option>
            <a-select-option value="all1">
              1125*3638
            </a-select-option>
            <a-select-option value="lucy">
              1125*4236
            </a-select-option>
            <a-select-option value="disabled">
              1125*2589
            </a-select-option>
            <a-select-option value="Yiminghe">
              1125*5839
            </a-select-option>
            <a-select-option value="all2">
              2250*12552
            </a-select-option>
            <a-select-option value="lucy2">
              1125*4926
            </a-select-option>
            <a-select-option value="disabled2">
              7505*1624
            </a-select-option>
          </a-select>
        </div>
      </div>


      <div class="d-flex mt-6">
        <div class="d-flex align-center">
          <div class="min-width-80px search-label">图片尺寸：</div>
          <a-select default-value="all" style="width: 180px">
            <a-select-option value="all">
              全部
            </a-select-option>
            <a-select-option value="lucy">
              App推广图
            </a-select-option>
            <a-select-option value="disabled">
              赛事推广图
            </a-select-option>
            <a-select-option value="Yiminghe">
              活动推广图
            </a-select-option>
          </a-select>
        </div>
        <div class="px-6"></div>
        <div>
          <a-button type="primary" class="mr-8">筛选</a-button>
          <a-button>重置</a-button>
        </div>
      </div>

      <div class="d-flex mt-8">

        <div v-for="item in allTag" class="font-bold text-center mr-8" style="width: 100px; line-height: 38px" @click="changeTag(item)" :class="selectTag == item.value?'selected':'noSelect'">
          {{item.text}}
        </div>

      </div>

      <!-- 列表展示区域 -->
      <div class="list-warp">
        <div class="list-item">
          <!-- 二维码 -->
          <!-- 海报html元素 -->
          <div id="posterHtml" class="posterBox" :style="{backgroundImage: 'url(' + bgImgURL + ')' }">
            <div class="posterContent">
              {{contentData}}
            </div>
            <!-- 二维码 -->
            <div class="qrcodeBox">
              <div id="qrcodeImg"></div>
            </div>
          </div>
          <img v-if="posterImgURL" class="posterBox" :src="posterImgURL" >
          <div class="item-right">
            <ul class="content">
              <li>
                <span class="title">图片标题：</span>
                <span class="data">开云体育热门赛事赛果更新</span>
              </li>
              <li>
                <span class="title">图片类型：</span>
                <span class="data">赛事推广图</span>
              </li>
              <li>
                <span class="title">更新日期：</span>
                <span class="data">2022-11-19 12:56:21</span>
              </li>
              <li>
                <span class="title">图片尺寸：</span>
                <span class="data">24554*1111 <a class="main-color" style="color: #49B1B3;" @click="downloadPoster(posterImgURL,'海报名称')"><a-icon type="arrow-down"  /> 下载</a></span>
              </li>
            </ul>
            <div class="img-btn" @click="createPoster">查看大图</div>
          </div>

        </div>
        <div class="list-item">
          <!-- 海报html元素 -->
          <div id="posterHtmls" class="posterBox" :style="{backgroundImage: 'url(' + bgImgURL + ')' }">
            <div class="posterContent">
              {{contentData}}
            </div>
            <!-- 二维码 -->
            <div class="qrcodeBox">
              <div id="qrcodeImgs"></div>
            </div>
          </div>
          <div class="item-right">
            <ul class="content">
              <li>
                <span class="title">图片标题：</span>
                <span class="data">开云体育热门赛事赛果更新</span>
              </li>
              <li>
                <span class="title">图片类型：</span>
                <span class="data">赛事推广图</span>
              </li>
              <li>
                <span class="title">更新日期：</span>
                <span class="data">2022-11-19 12:56:21</span>
              </li>
              <li>
                <span class="title">图片尺寸：</span>
                <span class="data">24554*1111 <a class="main-color" style="color: #49B1B3;"><a-icon type="arrow-down" /> 下载</a></span>
              </li>
            </ul>
            <div class="img-btn">查看大图</div>
          </div>

        </div>
      </div>


    </div>

  </div>
</template>

<script>

const allTag = [
  { text: '全部', value: 1 },
  { text: '本月', value: 2 },
  { text: '近三个月', value: 3 },
  { text: '近半年', value: 4 }
]
import QRCode from 'qrcodejs2'
import html2canvas from 'html2canvas'
import TagBg01 from '../../assets/icon/tag-bg-01.svg'
import bgImgURL from '../../assets/nodata.png'
export default {
  data(){
    return {
      allTag,
      TagBg01,
      selectTag: 1,
      bgImgURL: bgImgURL,
      contentData: '我是一张分享海报', // 文案内容
      posterImgURL: '', // 最终生成的海报图片URL
    }
  },
  mounted() {
    this.$nextTick(
      () => {
        this.createQrcode("https://www.baidu.com/")
      }
    )
  },
  methods: {
    changeTag(item){
      this.selectTag = item.value
    },
    // 生成二维码
    createQrcode(text) {
      let qrcodeImgEl = document.getElementById('qrcodeImg')
      qrcodeImgEl.innerHTML = ''
      let qrcode = new QRCode(qrcodeImgEl, {
        width: 100,
        height: 100,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
      })
      qrcode.makeCode(text)
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
  },

}

</script>


<style scoped lang="less">



.min-width-80px {
  min-width: 80px;
}

.noSelect {
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
}

.selected {
  color: @primary-color;
  background-image: url("../../assets/icon/check-box-icon.png");
  /*background-size: cover;*/
  cursor: pointer;
}

.list-warp{
  margin-top: 20px;
  .list-item{
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #FFFFFF;
    box-shadow: 0px 3px 6px 0px rgba(225,225,225,0.8);
    border-radius: 10px;
    padding: 30px;
    margin-bottom: 20px;
    .item-left{
      width: 415px;
      height: 182px;
      background: #faad14;
    }
    .item-right{
      .content{
        list-style: none;
        font-size: 16px;
        padding-left: 0;
        line-height: 30px;
        font-weight: 500;
        .title{
          color: #999999;
        }
        .data{
          color: #333333;
        }
      }
      .img-btn{
        width: 220px;
        // height: 40px;
        background: #49B1B3;
        box-shadow: 0px 1px 2px 0px rgba(73,177,179,0.6);
        border-radius: 20px;
        text-align: center;
        color: #FFF;
        padding: 8px 74px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
      }
    }
  }

}

</style>