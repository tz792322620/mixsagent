<template>
  <div class="pa-6">

    <div class="card pa-6">
      <div class="title-top">
        <div class="font-size-30 font-bold">佣金报表</div>
        <div class="btn" ><a-icon type="redo" />刷新</div>
    </div>
      <div class="font-size-18 primary-color d-flex py-3 mt-2" style="border-bottom: 1px solid #eee">
        <div class="primary-border-bottom-color py-2">个人佣金</div>
      </div>


      <div class="d-flex mt-7">
        <div class=" d-flex align-center">
          <div class="min-width-80px">佣金月份 : </div>
          <a-range-picker style="width: 220px"></a-range-picker>
        </div>
        <div class="px-6"></div>
        <div>
          <a-button class="mr-6 search-btn-circle" type="primary">筛选</a-button>
          <a-button class="clear-btn-circle">重置</a-button>
        </div>
      </div>

      <div style="height: 60px;"></div>

      <div v-for="item in data" class="d-flex table-edd align-center">
        <div style="width: 50%; line-height: 50px; margin-left: 120px" class="font-bold">{{ item.text }}</div>
        <div style="width: 50%; line-height: 50px;">{{ item.value }}</div>
      </div>
    </div>
  </div>

</template>

<script>
import { getAgentFinance } from "@/api/agentUser"
import { getAction } from '@/api/manage'
let data = [
  { text: '发放时间', value: '-' ,flag: 'openTime' },
  { text: '活跃账户', value: '-' , flag: 'userAmount'},
  { text: '有效新增账户', value: '-' , flag: 'userAmounts'},
  { text: '合约净输赢', value: '-'  , flag: 'contractProfit'},
  { text: '体育净输赢', value: '-'  , flag: 'sportProfit'},
  { text: '佣金比例', value: '-'  , flag: 'incomes'},
  { text: '佣金', value: '-'  , flag: 'income'},
  { text: '佣金发放状态', value: '-'  , flag: 'incomeStatus'}
]

export default {
  data() {
    return {
      data,
      form:  {
        openTime: null,
        userAmount: null,
        userAmounts: null,
        contractProfit: null,
        sportProfit: null,
        income: null,
        incomes: null,
        incomeStatus: null
      },
    }
  },
  created() {
    this.getPageData();
  },
  methods: {
    //获取页面数据
    getPageData() {
      getAction('/agentuser/agentUser/agentFinance',).then(res =>{
        console.log("数据",res);
        if(res.success) {
          this.form = res.result;
          this.changData(this.form);
        }
      }).catch(err =>{
        console.log(err);
      })
    },
    // 处理数据
    changData(form) {
      const keyArr = Object.keys(form);
      const dataArr = Object.values(form);
      for(let i= 0; i < keyArr.length; i++) {
        this.data.map(item =>{
          if(item.flag == keyArr[i]){
            this.$set(item, 'value', dataArr[i]);
          }
        })
      }

    }
  }
}

</script>

<style lang="less">

.primary-color {
  color: @primary-color;
}

.primary-border-bottom-color {
  border-bottom: 1px solid @primary-color;
}

.primary-border-color {
  border: 1px solid @primary-color;
}

.color-999 {
  color: #999;
}



.table-edd:nth-child(odd) {
  background-color: #f8f6f9;
}
</style>