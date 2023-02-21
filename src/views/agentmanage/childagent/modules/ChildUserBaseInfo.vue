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

            <div>
              <span class="base-info-desc" >{{item.text}}</span> :&nbsp;<span class="base-info-data">{{ agentUserInfo[item.value] }}</span>
            </div>

          </li>
        </ul>
      </div>
      <!--      用户资产-->
      <div class="card" style="margin-top: 30px;">
        <div class="baseInfo-card-title d-flex align-center">
          &nbsp;代理资产
        </div>
        <a-table
          :dataSource="agentUserUserVirtualWallet"
          :columns="virtualWalletColumnss"
          :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"
          class="ant-table-striped"
          :pagination="false"
          bordered
        />
      </div>
<!--      用户资产-->
      <div class="card" style="margin-top: 30px;">
        <div class="baseInfo-card-title d-flex align-center">
          &nbsp;名下代理
        </div>
        <a-table
          :dataSource="subordinateAgentSummary"
          :columns="virtualWalletColumn"
          :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"
          class="ant-table-striped"
          :pagination="false"
          bordered
        />
      </div>

      <!--      名下用户-->
      <div class="card" style="margin-top: 30px;">
        <div class="baseInfo-card-title d-flex align-center">
          &nbsp;名下用户
        </div>
        <a-table
          :dataSource="subordinateUserSummary"
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
      subordinateAgentSummary:[],
      subordinateUserSummary:[],
      agentUserUserVirtualWallet:[],
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


      virtualWalletColumn: [
        {
          title: '总人数',
          dataIndex: 'totalPeople',
          key: 'totalPeople',
        },
        {
          title: '用户钱包冻结',
          dataIndex: 'afterFreeze',
          key: 'afterFreeze',
        },
        {
          title: '用户钱包余额',
          dataIndex: 'afterBalance',
          key: 'afterBalance',
        },
        {
          title: '提币次数',
          dataIndex: 'numb',
          key: 'numb',
        },
        {
          title: '提币金额',
          dataIndex: 'amount',
          key: 'amount',
        }
      ],

      virtualWalletColumnss: [
        {
          title: '用户钱包冻结',
          dataIndex: 'afterFreeze',
          key: 'afterFreeze',
        },
        {
          title: '用户钱包余额',
          dataIndex: 'afterBalance',
          key: 'afterBalance',
        },
        {
          title: '提币次数',
          dataIndex: 'numb',
          key: 'numb',
        },
        {
          title: '提币金额',
          dataIndex: 'amount',
          key: 'amount',
        }
      ],

      virtualWalletColumns: [
        {
          title: '总人数',
          dataIndex: 'totalPeople',
          key: 'totalPeople',
        },
        {
          title: '合约冻结',
          dataIndex: 'contractAfterFreeze',
          key: 'contractAfterFreeze',
        },
        {
          title: '合约可用',
          dataIndex: 'contractAfterBalance',
          key: 'contractAfterBalance',
        },
        {
          title: '用户钱包冻结',
          dataIndex: 'afterFreeze',
          key: 'afterFreeze',
        },
        {
          title: '用户钱包可用',
          dataIndex: 'afterBalance',
          key: 'afterBalance',
        },
        {
          title: '合约净输赢',
          dataIndex: 'contractProfit',
          key: 'contractProfit',
        },
        {
          title: '提币金额',
          dataIndex: 'withdrawalAmount',
          key: 'withdrawalAmount',
        },
        {
          title: '充币金额',
          dataIndex: 'depositAmount',
          key: 'depositAmount',
        }

      ],
      userVirtualWalletVo: [],
      userVirtualWalletVos: [],
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
      getAction('/childagent/childAgent/findAgentAssetDetails',form).then(res =>{
        console.log(res);
        if(res.success) {
          const data = res.result;
          console.log(data)
          this.agentUserInfo = data;
          this.subordinateAgentSummary[0]= data.subordinateAgentSummary;
          console.log(this.subordinateAgentSummary)
          this.subordinateUserSummary[0]= data.subordinateUserSummary
          console.log(this.subordinateUserSummary)
          this.agentUserUserVirtualWallet[0]= data.agentUserUserVirtualWallet
          console.log(this.agentUserUserVirtualWallet)
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
</style>