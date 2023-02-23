<!--下级管理详情 -->
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
        <a-row>
          <a-col :span="6" v-for="item in baseInfoList" :key="item.value" class="py-4 base-info-box">
            <span class="base-info-desc">{{item.text}}</span> :&nbsp;<span class="base-info-data">{{ agentUserInfo[item.value] }}</span>
          </a-col>
        </a-row>
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
        />
      </div>
    </div>
  </div>

</template>

<script>
import {getAgentUserInfo} from "../../../../api/agentUser";

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
        { text: '会员等级', value: 'authorizeLevel' },
        { text: '会员状态', value: 'status' },
        { text: '会员名称', value: 'userName' },
        { text: '用户ID', value: 'id' },
        { text: '真实姓名', value: 'name' },
        { text: '会员手机号', value: 'phoneNo' },
        { text: '身份证号', value: 'cardNum' },
        { text: '邮箱ID', value: 'mail' },
        { text: '注册时间', value: 'createTime' },
        { text: '最近登录时间', value: 'updateTime' }
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
          title: '可用',
          dataIndex: 'afterBalance',
          key: 'afterBalance',
        },
        {
          title: '冻结',
          dataIndex: 'afterFreeze',
          key: 'afterFreeze',
        },
        {
          title: '待释放资产',
          dataIndex: 'aaa',
          key: 'aaa',
        },
        {
          title: '地址',
          dataIndex: 'virtualCoinAddress',
          key: 'virtualCoinAddress',
        }
      ]
    }
  },

  mounted() {
    // console.log(this.id)
    this.getUserInfo(this.id)
  },

  methods: {
    async getUserInfo(){
      this.loading = true
      try {
        let res = await getAgentUserInfo({id: this.id})
        if(res.code == 200){
          console.log(res.result)
          this.agentUserInfo = res.result
        }
      } catch (err){
        this.$notification['error']({
          message: '获取详细信息失败'
        });
      } finally {
        this.loading = false
      }

    },

    close(){
      this.$emit('back')
    }
  }

}
</script>

<style scoped>

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