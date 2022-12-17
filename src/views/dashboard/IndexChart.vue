<template>
  <div class="page-header-index-wide" >
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="3" :style="{ marginBottom: '24px' }">
        <div class="card pa-2">
          <div class="d-flex justify-center"  style="margin-top: 20px">
            <img src="../../assets/icon/Analysis-01.svg" />
          </div>
          <div class="text-center" style="margin-top: 40px; padding-bottom: 20px;">
            <div class="font-bold font-size-18">{{syxx.childAgentCount}}</div>
            <div class="mt-2">下级代理</div>
          </div>
        </div>
<!--        <chart-card :loading="loading" title="总销售额" total="￥126,560">
          <a-tooltip title="指标说明" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip>
          <div>
            <trend flag="up" style="margin-right: 16px;">
              <span slot="term">周同比</span>
              12%
            </trend>
            <trend flag="down">
              <span slot="term">日同比</span>
              11%
            </trend>
          </div>
          <template slot="footer">日均销售额<span>￥ 234.56</span></template>
        </chart-card>-->
      </a-col>

      <a-col :sm="24" :md="12" :xl="3" :style="{ marginBottom: '24px' }">
        <div class="card pa-2">
          <div class="d-flex justify-center"  style="margin-top: 20px">
            <img src="../../assets/icon/Analysis-02.svg" />
          </div>
          <div class="text-center" style="margin-top: 40px; padding-bottom: 20px;">
            <div class="font-bold font-size-18">{{syxx.childUserCount}}</div>
            <div class="mt-2">下级成员</div>
          </div>
        </div>
      </a-col>
      <a-col :sm="24" :md="12" :xl="3" :style="{ marginBottom: '24px' }">
        <div class="card pa-2">
          <div class="d-flex justify-center"  style="margin-top: 20px">
            <img src="../../assets/icon/Analysis-03.svg" />
          </div>
          <div class="text-center" style="margin-top: 40px; padding-bottom: 20px;">
            <div class="font-bold font-size-18">{{syxx.moneyRecord}}</div>
            <div class="mt-2">首存人数</div>
          </div>
        </div>
      </a-col>
      <a-col :sm="24" :md="12" :xl="3" :style="{ marginBottom: '24px' }">
        <div class="card pa-2">
          <div class="d-flex justify-center"  style="margin-top: 20px">
            <img src="../../assets/icon/Analysis-04.svg" />
          </div>
          <div class="text-center" style="margin-top: 40px; padding-bottom: 20px;">
            <div class="font-bold font-size-18">{{syxx.register}}</div>
            <div class="mt-2">本月新注册</div>
          </div>
        </div>
      </a-col>
      <a-col :sm="24" :md="12" :xl="3" :style="{ marginBottom: '24px' }">
        <div class="card pa-2">
          <div class="d-flex justify-center"  style="margin-top: 20px">
            <img src="../../assets/icon/Analysis-05.svg" />
          </div>
          <div class="text-center" style="margin-top: 40px; padding-bottom: 20px;">
            <div class="font-bold font-size-18">{{syxx.addUser}}</div>
            <div class="mt-2">有效新增会员</div>
          </div>
        </div>
      </a-col>
      <a-col :sm="24" :md="12" :xl="3" :style="{ marginBottom: '24px' }">
        <div class="card pa-2">
          <div class="d-flex justify-center"  style="margin-top: 20px">
            <img src="../../assets/icon/Analysis-06.svg" />
          </div>
          <div class="text-center" style="margin-top: 40px; padding-bottom: 20px;">
            <div class="font-bold font-size-18">{{syxx.users}}</div>
            <div class="mt-2">本月活跃会员</div>
          </div>
        </div>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <div class="card pa-2">
          <div class="d-flex"  style="margin: 10px 0 0 10px">
            <div class="font-bold">佣金比例</div>
          </div>
          <div class="text-center" style="margin-top: 40px; padding-bottom: 20px; height: 110px;font-size: 3rem;">
            <!-- <indexCommissionLine></indexCommissionLine> -->
            {{yjbls}}
          </div>
        </div>
      </a-col>

    </a-row>

    <div class="card pa-6">
      <div class="font-size-30 ">数据对比</div>
      <bar title=" " :dataSource="barData"/>
      <div class="d-flex">
        <div v-for="item in chartsTagList" @click="qh(item)" class="mr-4 pa-1 chart-tag px-3 font-size-14" :class="selectedTag == item.value?'selectedTag':'noSelectedTag'">
          {{item.text}}
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { putAction,postAction,getAction } from '@/api/manage'
  import ChartCard from '@/components/ChartCard'
  import ACol from "ant-design-vue/es/grid/Col"
  import ATooltip from "ant-design-vue/es/tooltip/Tooltip"
  import MiniArea from '@/components/chart/MiniArea'
  import MiniBar from '@/components/chart/MiniBar'
  import MiniProgress from '@/components/chart/MiniProgress'
  import RankList from '@/components/chart/RankList'
  import Bar from '@/components/chart/Bar'
  import LineChartMultid from '@/components/chart/LineChartMultid'
  import HeadInfo from '@/components/tools/HeadInfo.vue'

  import IndexCommissionLine from "@/components/chart/IndexCommissionLine"

  import Trend from '@/components/Trend'
  import { getLoginfo,getVisitInfo } from '@/api/api'


  const chartsTagList = [
    { text: '新注册存款金额', value: 1 },
    { text: '总存款', value: 2 },
    { text: '输赢', value: 3 },
  ]

  const rankList = []
  for (let i = 0; i < 7; i++) {
    rankList.push({
      name: '白鹭岛 ' + (i+1) + ' 号店',
      total: 1234.56 - i * 100
    })
  }
  const barData = []
  for (let i = 0; i < 15; i += 1) {
    barData.push({
      x: `${i + 1}日`,
      y: Math.floor(Math.random() * 1000) + 200
    })
  }
  export default {
    name: "IndexChart",
    components: {
      ATooltip,
      ACol,
      ChartCard,
      MiniArea,
      MiniBar,
      MiniProgress,
      RankList,
      Bar,
      Trend,
      LineChartMultid,
      HeadInfo,
      IndexCommissionLine,

    },
    data() {
      return {
        loading: true,
        center: null,
        rankList,
        barData,
        loginfo:{},
        visitFields:['ip','visit'],
        visitInfo:[],
        indicator: <a-icon type="loading" style="font-size: 24px" spin />,

        chartsTagList,
        selectedTag: 1,
        syxx:{},
        yjbls:'',
      }
    },
    created() {
      setTimeout(() => {
        this.loading = !this.loading
      }, 1000)
      this.initLogInfo();
      this.sy();
      this.yjbl();
      this.qh({value:1});
    },
    methods: {
      sy(){
        getAction(`/agentuser/agentUser/homeStatistic`).then(res=>{
          this.syxx = res.result
          console.log(this.syxx);

        })
      },
      yjbl(){
        getAction(`/agentincomeconfig/agentIncomeConfig/queryByUserId`).then(res=>{
          this.yjbls = res.result
          console.log(this.yjbls);

        })
      },
      qh(e){
        console.log(e.value)
        this.selectedTag = e.value
        this.barData = []

        let that = this
        let type = e.value
        getAction(`/usermoneyrecord/userMoneyrecord/homePageAmountCount`,{type:type}).then(res=>{
            console.log(res.result)
          res.result.map((item=>{
            that.barData.push({
              x: item.dayTime+`日`,
              y: item.sumMoney
            })
          }))
        })


      },
      initLogInfo () {
        getLoginfo(null).then((res)=>{
          if(res.success){
            Object.keys(res.result).forEach(key=>{
              res.result[key] =res.result[key]+""
            })
            this.loginfo = res.result;
          }
        })
        getVisitInfo().then(res=>{
          if(res.success){
             this.visitInfo = res.result;
           }
         })
      },
    }
  }
</script>

<style lang="less" scoped>

  .circle-cust{
    position: relative;
    top: 28px;
    left: -100%;
  }
  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  /* 首页访问量统计 */
  .head-info {
    position: relative;
    text-align: left;
    padding: 0 32px 0 0;
    min-width: 125px;

    &.center {
      text-align: center;
      padding: 0 32px;
    }

    span {
      color: rgba(0, 0, 0, .45);
      display: inline-block;
      font-size: .95rem;
      line-height: 42px;
      margin-bottom: 4px;
    }
    p {
      line-height: 42px;
      margin: 0;
      a {
        font-weight: 600;
        font-size: 1rem;
      }
    }
  }

  .card {
    background-color: white;
    border-radius: 10px;
  }

  .chart-tag {
    border-radius: 14px;
  }

  .noSelectedTag {
    border: 1px solid #ccc;
  }

  .selectedTag {
    border: 1px solid @primary-color;
    color: @primary-color;
  }

</style>

<style scoped>


</style>