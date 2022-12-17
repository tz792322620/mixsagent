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
          <div class="item-left">
            <img style="height: 100%;" src="../../assets/icon/CodeImg2.svg" alt="">
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
        <div class="list-item">
          <div class="item-left">
            <img style="height: 100%;" src="../../assets/icon/CodeImg2.svg" alt="">
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

import TagBg01 from '../../assets/icon/tag-bg-01.svg'

export default {
  data(){
    return {
      allTag,
      TagBg01,
      selectTag: 1
    }
  },

  methods: {
    changeTag(item){
      this.selectTag = item.value
    }
  }
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