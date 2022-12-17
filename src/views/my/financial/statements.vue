<template>
  <div class="pa-6">

    <div class="card pa-6">
      <div class="title-top">
        <div class="font-size-30 font-bold">财务报表</div>
        <div class="btn" @click="getPageData()"><a-icon type="redo"  />刷新</div>
    </div>

      <div class="d-flex mt-6">
        <div class="d-flex">
          <div class=" d-flex align-center">
            <div class="min-width-80px">统计时间 : </div>
            <a-range-picker style="width: 220px"></a-range-picker>
          </div>
        </div>
        <div class="px-6"></div>
        <div>
          <a-button class="mr-6 search-btn-circle" type="primary">筛选</a-button>
          <a-button class="clear-btn-circle">重置</a-button>
        </div>
      </div>

      <div class="d-flex justify-space-between flex-wrap">
          <div class="d-flex" style="min-width: 30%;">
            <div class="pa-4 e8e8e8-border-color mt-7" style="width: 100%; height: 150px">
              <div class="d-flex justify-space-between align-center">
                <div class="font-size-22 color-666">存款</div>
<!--                <div class="primary-color cursor"  @click="() => (modal2Visible = true)">查看详情</div>-->
              </div>
              <div class="font-bold font-size-24 mt-5">{{form.balance}}</div>
            </div>
          </div>

          <div class="d-flex" style="min-width: 30%;">
            <div class="pa-4 e8e8e8-border-color mt-7" style="width: 100%; height: 150px">
              <div class="d-flex justify-space-between align-center">
                <div class="font-size-22 color-666">提款</div>
              </div>
              <div class="font-bold font-size-24 mt-5">{{form.totalAmount}}</div>
            </div>
          </div>

          <div class="d-flex" style="min-width: 30%;">
            <div class="pa-4 e8e8e8-border-color mt-7" style="width: 100%; height: 150px">
              <div class="d-flex justify-space-between align-center">
                <div class="font-size-22 color-666">净输赢</div>
              </div>
              <div class="font-bold font-size-24 mt-5">{{form.profit}}</div>
            </div>
          </div>

          <div class="d-flex" style="min-width: 30%;">
            <div class="pa-4 e8e8e8-border-color mt-7" style="width: 100%; height: 150px">
              <div class="d-flex justify-space-between align-center">
                <div class="font-size-22 color-666">手续费</div>
<!--                <div class="primary-color cursor" @click="() => (modal2Visible = true)">查看详情</div>-->
              </div>
              <div class="font-bold font-size-24 mt-5">{{form.charge}}</div>
            </div>
          </div>


      </div>
      <div class="red-color mt-7 font-size-16 opacity-85">提示：总输赢，净输赢中正数表示公司盈利，负数表示公司亏损，每天数据之作普通参考，并不做实际佣金派发标准。</div>
      <!-- <DepositDialog :show=""></DepositDialog> -->


    </div>
    <!-- 存款详情弹框 -->
    <a-modal
      v-model="modal2Visible"
      title="手续费"
      centered
      :footer="null"
      @ok="() => (modal2Visible = false)"
    >
    <a-table :columns="columns" :data-source="data" class="mt-4">
        <span slot="action" slot-scope="text, record">
          <a-button>编辑</a-button>
        </span>
      </a-table>
    </a-modal>

  </div>

</template>

<script>
import DepositDialog from './modules/DepositDialog';

const columns = [
  {
    title: '种类',
    dataIndex: 'type',
    key: 'type',
    scopedSlots: { customRender: 'type' },
    algin: ""
  },
  {
    title: '金额',
    dataIndex: 'money',
    key: 'money',
    algin: "center"
  },
];

const data = [
  {
    type: "开仓",
    money: "110.2"
  },
  {
    type: "持仓",
    money: "3110.2"
  },
  {
    type: "投注",
    money: "1210.2"
  },
];
import { httpAction, getAction } from '@/api/manage'
export default {
  data(){
    return {
      modal2Visible: false,
      columns,
      data,
      form: {
        totalAmount: '',
        balance: '',
        profit: '',
        charge: ''
      }
    }
  },
  components: {
    DepositDialog
  },
  created() {
    this.getPageData();
  },
  methods: {
    setModal1Visible(modal1Visible) {
      this.modal1Visible = modal1Visible;
    },
    //获取页面数据
    getPageData() {
      getAction('/agentuser/agentUser/finance',).then(res =>{
        console.log("数据",res);
        if(res.success) {
          this.form = res.result;
        }
      }).catch(err =>{
        console.log(err);
      })
    }
  }
}

</script>

<style lang="less">

.opacity-85 {
  opacity: .65;
}

.red-color{
  color: red;
}

.e8e8e8-border-color {
  border: 1px solid #efeeee;
  border-radius: 4px;
}

.primary-color {
  color: @primary-color;
}

.primary-border-bottom-color {
  border-bottom: 1px solid @primary-color;
}

.primary-border-color {
  border: 1px solid @primary-color;
}

.color-666 {
  color: #666;
}

.color-999 {
  color: #999;
}
.cursor{
  cursor:pointer
}

//隐藏弹框底部按钮
/deep/.ant-modal{
  .ant-modal-footer{
    display: none;
  }
}
</style>