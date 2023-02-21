<template>
  <div class="pa-6">

    <div class="card pa-6">
      <div class="title-top">
        <div class="font-size-30 font-bold">财务报表</div>
        <div class="btn" @click="getPageData()"><a-icon type="redo"  />刷新</div>
      </div>
<!--      <ul style="height: 100px;">-->
<!--        <li v-for="item in baseInfoList" :key="item.value" class="py-4 base-info-box">-->

<!--          <div>-->
<!--            <span class="base-info-desc" >{{item.text}}</span> :&nbsp;<span class="base-info-data">{{ agentUserInfo[item.value] }}</span>-->
<!--          </div>-->

<!--        </li>-->
<!--      </ul>-->


<!--      <div class="card" style="margin-top: 30px;">-->
<!--        <div class="baseInfo-card-title d-flex align-center">-->
<!--          &nbsp;资产信息-->
<!--        </div>-->
<!--        <a-table-->
<!--          :dataSource="agentUserUserVirtualWallet"-->
<!--          :columns="virtualWalletColumnss"-->
<!--          :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"-->
<!--          class="ant-table-striped"-->
<!--          :pagination="false"-->
<!--          bordered-->
<!--        />-->
<!--      </div>-->
            <div class="card" style="margin-top: 30px;">
              <div class="baseInfo-card-title d-flex align-center">
                &nbsp;返佣信息
              </div>
              <div style="display: flex;justify-content: space-between;">
                <a-card title="我的返佣" style="width: 45%">
                  <a slot="extra" href="#">0</a>
                  <div style="display: flex;justify-content: space-between;">
                    <div>已结算:100</div>
                    <div>未结算:100</div>
                  </div>
                </a-card>
                <a-card title="下级代理总返佣" style="width: 45%">
                  <a slot="extra" href="#">0</a>
                  <div style="display: flex;justify-content: space-between;">
                    <div>已结算:100</div>
                    <div>未结算:100</div>
                  </div>
                </a-card>
              </div>

              <div style="display: flex;justify-content: space-between;margin-top: 20px;">
                <a-card title="直接用户" style="width: 45%">
                  <a slot="extra" href="#">0</a>
                  <div style="display: flex;justify-content: space-between;">
                    <div>总盈亏:100</div>
                    <div>未实现盈亏:100</div>
                  </div>
                  <div style="display: flex;justify-content: space-between;margin-top: 10px;">
                    <div>现持仓:100</div>
                    <div>总手续费:100</div>
                  </div>
                </a-card>
                <a-card title="下级代理的用户" style="width: 45%">
                  <a slot="extra" href="#">0</a>
                  <div style="display: flex;justify-content: space-between;">
                    <div>总盈亏:100</div>
                    <div>未实现盈亏:100</div>
                  </div>
                  <div style="display: flex;justify-content: space-between; margin-top: 10px;">
                    <div>现持仓:100</div>
                    <div>总手续费:100</div>
                  </div>
                </a-card>
              </div>
            </div>


    </div>
    <!-- 存款详情弹框 -->
<!--    <a-modal-->
<!--      v-model="modal2Visible"-->
<!--      title="手续费"-->
<!--      centered-->
<!--      :footer="null"-->
<!--      @ok="() => (modal2Visible = false)"-->
<!--    >-->
<!--    <a-table :columns="columns" :data-source="data" class="mt-4">-->
<!--        <span slot="action" slot-scope="text, record">-->
<!--          <a-button>编辑</a-button>-->
<!--        </span>-->
<!--      </a-table>-->
<!--    </a-modal>-->

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
      subordinateAgentSummary:[],
      baseInfoList: [
        // { text: '代理商账户', value: 'phone' },
        { text: '提币地址', value: 'address' },
        { text: '用户ID', value: 'id' },
        { text: '真实姓名', value: 'name' },
        { text: '手机号', value: 'phone' },
        { text: '邮箱', value: 'email' },
        { text: '注册时间', value: 'createTime' },
        { text: '最近登陆时间', value: 'lastLoginTime' },

      ],
      modal2Visible: false,
      columns,
      data,
      timeEl:[],
      searchForm:{},
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
    onChange(date, dateString) {
      this.searchForm.commissionStartTime = dateString[0];
      this.searchForm.commissionEndTime = dateString[1];

      console.log(this.searchForm);
    },
    //获取页面数据
    getPageData(searchQuery) {
      getAction('/agentuser/agentUser/finance',searchQuery).then(res =>{
        console.log("数据",res);
        if(res.success) {
          this.form = res.result;
        }
      }).catch(err =>{
        console.log(err);
      })
    },
    // 搜索
    search() {
      this.getPageData(this.searchForm)
    },
    // 清除搜索
    clear() {
      this.searchForm = {};
      this.getPageData()
    },
  }
}

</script>

<style lang="less">
a {
  color: #49b1b3;
}
li{
  list-style: none;
  padding: 0;
  margin: 6px 0;
  float: left;
  display: block;
  width: 25%;
}

.card {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
}

.baseInfo-card-title {
  font-weight: 600;
  font-size: 28px;
  margin-bottom: 20px;
  color: black;
  opacity: 0.75;
}

.d-flex{
  display: flex;
}

.align-center {
  align-items: center;
}

.base-info-box {
  font-size: 16px;
}
.ant-col-6 {
  display: block;
  box-sizing: border-box;
  width: 100%;
}

/*.base-info-box .base-info-desc {*/
/*  opacity: .85;*/
/*}*/
.base-info-box .base-info-data {
  font-weight: bold;
}

.ant-table-striped /deep/ .table-striped td {
  background-color: #fafafa;
}
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
/deep/.a {
  color: #49b1b3;
}
</style>