<template>
  <div>
    <div v-if="loading" class="d-flex justify-center" style="margin-top: 20vh">
      <a-spin size="large" />
    </div>
    <div v-else>

<!--      基本信息-->
      <div class="card">
        <div @click="close()" class="baseInfo-card-title d-flex align-center">
          <a-icon type="left" style="font-size: 22px" />
          &nbsp;基本信息
        </div>
        <ul style="height: 100px;">
          <li v-for="item in baseInfoList" :key="item.value" class="py-4 base-info-box">
            <div v-if="item.value == 'type'">
<!--              <span class="base-info-data" v-if="agentUserInfo[item.value] == 0">{{item.text}}:普通用户</span>-->
<!--              <span class="base-info-data" v-if="agentUserInfo[item.value] == 1">{{item.text}}:代理商</span>-->
              <span class="base-info-desc" >{{item.text}}</span> :&nbsp;<span class="base-info-data" v-html="agentUserInfo[item.value] == 0? '普通用户':'代理商'">{{ agentUserInfo[item.value] }}</span>
            </div>
            <div v-else-if="item.value == 'status'">
              <span class="base-info-data" v-if="agentUserInfo[item.value] == 0"><span class="base-info-desc" >{{item.text}}</span>:禁用</span>
              <span class="base-info-data" v-if="agentUserInfo[item.value] == 1"><span class="base-info-desc" >{{item.text}}</span>:启用</span>
              <span class="base-info-data" v-if="agentUserInfo[item.value] == 2"><span class="base-info-desc" >{{item.text}}</span>:禁止交易</span>
            </div>
            <div v-else>
              <span class="base-info-desc" >{{item.text}}</span> :&nbsp;<span class="base-info-data">{{ agentUserInfo[item.value] }}</span>
            </div>

          </li>
        </ul>
      </div>

<!--      用户资产-->
      <div class="card" style="margin-top: 30px;">
        <div class="baseInfo-card-title d-flex align-center">
          &nbsp;用户资产
        </div>
        <a-table
          :dataSource="agentUserInfo.userVirtualWalletVo"
          :columns="virtualWalletColumns"
          :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"
          class="ant-table-striped"
          :pagination="false"
          bordered
        />
      </div>
    </div>
  </div>

</template>

<script>
import {getAgentUserInfo} from "../../../../api/agentUser";
import { httpAction, getAction } from '@/api/manage'
export default {
  name: "AgentUserBaseInfo",

  props: {
    //表单禁用
    id: {
      type: String,
      required: true
    }
  },

  watch: {
    id(newVal, oldVal){
      console.log(newVal)
    }
  },

  data(){
    return{
      loading: false,
      agentUserInfo: {},
      baseInfoList: [
        { text: '会员类型', value: 'type' },
        { text: '会员等级', value: 'level' },
        { text: '会员状态', value: 'status' },
        { text: '会员名称', value: 'userName' },
        { text: '用户ID', value: 'id' },
        { text: '真实姓名', value: 'name' },
        { text: '会员手机号', value: 'phoneNo' },
        { text: '身份证号', value: 'cardNum' },
        { text: '邮箱', value: 'mail' },
        { text: '注册时间', value: 'createTime' },
        { text: '最近登录时间', value: 'lastLoginTime' },
        { text: '最近登录IP', value: 'lastLoginIp' }
      ],

    // {
    //   "virtualCoinName": "usdt",
    //   "afterFreeze": 0,
    //   "beforeFreeze": 100000,
    //   "beforeBalance": 0,
    //   "afterBalance": 1000000,
    //   "virtualCoinAddress": "TA2CR1Kh7TzsurM2kkEMPn2Qs6FVggySpD|0xe5bd1cf578be393cc81f29766c981ae9f314d7a4"
    // }
      virtualWalletColumns: [
        {
          title: '币种',
          dataIndex: 'virtualCoinName',
          key: 'virtualCoinName',
        },
        {
          title: '资产账户可用',
          dataIndex: 'afterBalance',
          key: 'afterBalance',
        },
        {
          title: '资产账户冻结',
          dataIndex: 'afterFreeze',
          key: 'afterFreeze',
        },
        {
          title: '合约账户可用',
          dataIndex: 'contractAfterBalance',
          key: 'contractAfterBalance',
        },
        {
          title: '合约账户冻结',
          dataIndex: 'contractAfterFreeze',
          key: 'contractAfterFreeze',
        }
      ],
      userVirtualWalletVo: [],
    }
  },

  mounted() {
    // console.log(this.id)
    this.getUserInfo(this.id)
  },

  methods: {
    getUserInfo(id) {
      const form ={
        id: id
      }
      getAction('agentuser/agentUser/findInfo',form).then(res =>{
        console.log(res);
        if(res.success) {
          const data = res.result;
          this.agentUserInfo = data;
          // this.userVirtualWalletVo = data.userVirtualWalletVo;
        }

      }).catch((err) => {
        console.log(err);
      });
    },
    close(){
      this.$emit('back')
    }
  }

}
</script>

<style scoped>

li{
  list-style: none;
  padding: 0;
  margin: 6px 0;
  /*float: left;*/
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
  float: left;
  width: 25%;
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
</style>