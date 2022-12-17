<!-- 提款申请 -->
<template>
  <div class="pa-6">
    <div class="card pa-6">
      <div class="title-top">
        <div class="font-size-30 font-bold">提款申请</div>
        <div class="btn" @click="getPageData"><a-icon type="redo" />刷新</div>
    </div>
      <div class="font-size-18 primary-color d-flex py-3 mt-2" style="border-bottom: 1px solid #eee">
        <div class="primary-border-bottom-color py-2">提款至虚拟账币账号</div>
      </div>

      <div class="d-flex">
        <div class="d-flex mt-6 pa-2" style="border: 1px solid #f6f6f6; border-radius: 4px; width: 240px; align-items: center;justify-content: space-between;">
          <img src="../../../assets/icon/commission.svg" alt="">
          <div style="" class=" px-4 py-1">
            <div class="color-999">可用佣金</div>
            <div></div>
            <div class="tab-item-text">
              <span v-if="!isHide">*******</span>
              <span v-else>{{dataForm.balance}}</span>
              <div class="icon" @click="changehide">
                <img v-if="isHide" src="../../../assets/icon/eye.svg" />
                <img v-else src="../../../assets/icon/eye-hide.svg" />
              </div>
            </div>
          </div>
          <div class="apply-btn" @click="handleAddAddress">申请提现</div>
        </div>

        <div class="px-6"></div>

        <div class="d-flex mt-6 pa-2" style="border: 1px solid #f6f6f6; border-radius: 4px; width: 240px;">
          <img src="../../../assets/icon/commission-disabled.svg" alt="">
          <div style="" class=" px-4 py-1">
            <div class="color-999">不可用佣金</div>
            <div class="tab-item-text">
              <span v-if="!isHide">*******</span>
              <span v-else>{{dataForm.free}}</span>
              <div class="icon" @click="changehide">
                <img v-if="isHide" src="../../../assets/icon/eye.svg" />
                <img v-else src="../../../assets/icon/eye-hide.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="my-5 d-flex">
        <div type="primary" shape="round" class="primary-border-color px-4 py-1 primary-color" style="border-radius: 15px;cursor:pointer;" @click="handleAddAddress2()" >添加提币地址</div>
        <!-- 添加提币成功后显示样式  对接数据后启用 -->
        <div v-if="false" class="add-success-text-style px-4 py-1">{{dataForm.agentVirtualAddress}}</div>
      </div>
      <a-table  :columns="columns" :data-source="dataForm.withdrawalRecordVos" class="mt-4">

        <template slot="status" slot-scope="status">

            <span v-if="status == 1">审核中</span>
            <span v-if="status == 2">二级审核通过</span>
            <span v-if="status == 3">一级审核通过</span>
            <span v-if="status == 4">一级审核拒绝</span>
            <span v-if="status == 5">打币中</span>
            <span v-if="status == 6">已到账</span>
            <span v-if="status == 7">拒绝</span>

        </template>


        <span slot="action" slot-scope="text, record">
          <!-- <a>编辑</a> -->
          <a @click="xq(record)" class="table-handle-btn"> 详情</a>
        </span>
      </a-table>

    </div>
    <!-- 添加提币地址 -->
    <a-modal v-model="addAddressModel" title="添加提币地址" centered :footer="null">
      <a-form :form="addAddressForm">
        <a-form-item>
          <a-input v-model="addAddressForm.virtualAddress" placeholder="请输入提币地址"></a-input>
        </a-form-item>
        <a-form-item >

          <div style="display: flex">

            <a-input style="width: 8rem;"  a-input v-model="addAddressForm.phoneCode"  placeholder="请输入手机验证码"  >
            </a-input>
            <a-button style="width: 8rem;"  @click.stop.prevent="getsjyyzm()"  v-text="!yxstate.smsSendBtn && '获取验证码' || (yxstate.time+' s')">
            </a-button>
          </div>
        </a-form-item>
        <a-form-item >

          <div style="display: flex">

            <a-input style="width: 8rem;"  a-input v-model="addAddressForm.mailCode"  placeholder="请输入邮箱验证码"  >
            </a-input>
            <a-button style="width: 8rem;"  @click.stop.prevent="getyxyzm()"  v-text="!yxstate.smsSendBtn && '获取验证码' || (yxstate.time+' s')">
            </a-button>
          </div>
        </a-form-item>
      </a-form>
      <div class="d-flex justify-space-around">
          <a-button class="canc-btn" @click="cancelAddAdress">取消</a-button>
          <a-button class="sub-btn" @click="submitAddAdress">确定</a-button>
      </div>
    </a-modal>

   <!-- 添加虚拟币账户弹框 -->
    <a-modal
      v-model="modal2Visible"
      title="申请提币"
      centered
      @ok="() => (modal2Visible = false)"
      :footer="null"
    >
      <!-- 表单 -->
    <div>
      <a-form :form="tbxxform" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }" @submit="handleSubmit">
        <!-- 未添加账户提现显示 -->
        <a-form-item label="提币地址:" >
          <a-input v-model="tbxxform.virtualAddress"  placeholder="请输入提币地址" />
        </a-form-item>
        <a-form-item label="确认地址:"  >
          <a-input v-model="tbxxform.virtualAddress"  placeholder="请再次输入提币地址" />
        </a-form-item>
        <!-- 添加账户后提现显示 -->
        <a-form-item label="虚拟币账户:" v-if="false">
          <a-input class="data-disabled-style" v-model="tbxxform.virtualAddress"  placeholder="请输入虚拟币账户" value="0x70cB9D4B3C7bAa0f3BaCDCB588e3c9D5b44Fa76d"  disabled="true" />
        </a-form-item>
        <a-form-item label="虚拟币种:">
          <a-radio-group default-value="a" size="large">
            <a-radio-button value="UTSD" class="check-box-bag">
              UTSD
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="虚拟协议:">
          <a-radio-group default-value="TRC20" @change="onChange">
            <a-radio-button value="TRC20" class="margin-right-20 "  :class="tbxxform.protocols == 'TRC20' ? 'check-box-bag' : '' ">
              TRC20
            </a-radio-button>
            <a-radio-button value="ERC20" class="uncheck-size-style" :class="tbxxform.protocols == 'ERC20' ? 'check-box-bag' : '' ">
              ERC20
            </a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="提款金额:">
          <a-input v-model="tbxxform.amount" placeholder="100.00≤单笔提款金额≤2000.000.00"/>
        </a-form-item>
        <div>
          <p>参考汇率：<span>1</span> USDT <span>7.06</span> CNY</p>
          <p>预计手续费：<span>1.000</span> USDT, 预计到账：<span>0.000</span> USDT</p>
        </div>
        <a-form-item >
          <div style="display: flex">
            <a-input style="width: 8rem;" a-input v-model="tbxxform.phoneCode"  placeholder="请输入手机验证码"  >
            </a-input>
            <a-button style="width: 8rem;"  @click.stop.prevent="getsjyzm()" v-text="!sjstate.smsSendBtn && '获取验证码' || (sjstate.time+' s')">
            </a-button>
          </div>

        </a-form-item>
        <a-form-item >
          <div style="display: flex">

            <a-input style="width: 8rem;"  a-input v-model="tbxxform.mailCode"  placeholder="请输入邮箱验证码"  >
            </a-input>
            <a-button style="width: 8rem;"  @click.stop.prevent="getyxyzm()"  v-text="!yxstate.smsSendBtn && '获取验证码' || (yxstate.time+' s')">
            </a-button>
          </div>

        </a-form-item>
      </a-form>
      <a-button class="primary" block style="background: #49B1B3;color: #fff;" @click="tibi()">确认</a-button>
    </div>
    </a-modal>

    <!-- 密码验证弹框 -->
    <a-modal
      v-model="pasVisible"
      title="输入支付密码查看"
      class="modal-style"
      centered
      @ok="() => (pasVisible = false)"
      :footer="null"
    >
    <a-form >
      <a-form-item>
        <a-input
            v-decorator="['note', { rules: [{ required: true, message: '请输入原密码' }] }]" placeholder="请输入原密码"
          />
      </a-form-item>

    </a-form>
    <div class="d-flex justify-space-around">
        <a-button class="canc-btn" @click="pasVisible = false">取消</a-button>
        <a-button class="sub-btn" @click="verifyCode">确定</a-button>
    </div>
    </a-modal>

    <!-- 提款详情弹框 -->
    <a-modal v-model="detailsModal" title="订单详情" centered :footer="null">
      <!-- 详情数据 -->
      <ul class="des-list">
        <li class="des-item">
          <span class="des-item-title">虚拟币账户：</span>
          <span class="des-item-data">{{ detailsForm.virtualAddress }} </span>
        </li>
<!--        <li class="des-item">-->
<!--          <span class="des-item-title">货币种类：</span>-->
<!--          <span class="des-item-data">USDT</span>-->
<!--        </li>-->
        <li class="des-item">
          <span class="des-item-title">货币协议：</span>
          <span class="des-item-data">{{ detailsForm.protocols }} </span>
        </li>
        <li class="des-item">
          <span class="des-item-title">提款金额(USDT)：</span>
          <span class="des-item-data main-color">{{ detailsForm.amount }} </span>
        </li>
        <li class="des-item">
          <span class="des-item-title">手续费(USDT)：</span>
          <span class="des-item-data main-color">{{ detailsForm.amount }} </span>
        </li>
        <li class="des-item">
          <span class="des-item-title">到账(USDT)：</span>
          <span class="des-item-data main-color">{{ detailsForm.amount }} </span>
        </li>
<!--        <li class="des-item">-->
<!--          <span class="des-item-title">类型：</span>-->
<!--          <span class="des-item-data">已结算</span>-->
<!--        </li>-->
        <li class="des-item">
          <span class="des-item-title">提款状态：</span>
<!--          <span class="des-item-data">{{ detailsForm.status }} </span>-->
          <span class="des-item-data" v-if="detailsForm.status == 1">审核中</span>
          <span class="des-item-data" v-if="detailsForm.status == 2">二级审核通过</span>
          <span class="des-item-data" v-if="detailsForm.status == 3">一级审核通过</span>
          <span class="des-item-data" v-if="detailsForm.status == 4">一级审核拒绝</span>
          <span class="des-item-data" v-if="detailsForm.status == 5">打币中</span>
          <span class="des-item-data" v-if="detailsForm.status == 6">已到账</span>
          <span class="des-item-data" v-if="detailsForm.status == 7">拒绝</span>
        </li>
        <li class="des-item">
          <span class="des-item-title">提款时间：</span>
          <span class="des-item-data">{{ detailsForm.createTime }} </span>
        </li>
        <li class="des-item">
          <span class="des-item-title">到账时间：</span>
          <span class="des-item-data">{{ detailsForm.updateTime }} </span>
        </li>
      </ul>
    </a-modal>
  </div>

</template>

<script>
import { httpAction, getAction } from '@/api/manage'
import { postAction } from '../../../api/manage';
import { mapActions, mapGetters,mapState } from 'vuex'
const columns = [
  // {
  //   title: '币种分类',
  //   dataIndex: 'id',
  //   key: 'id',
  //   scopedSlots: { customRender: 'name' },
  // },
  {
    title: '虚拟币协议',
    dataIndex: 'protocols',
    key: 'protocols',
    width: 120,
  },

  {
    title: '虚拟币账户',
    dataIndex: 'virtualAddress',
    key: 'virtualAddress',

  },
  {
    title: '提款金额(USDT)',
    dataIndex: 'amount',
    key: 'amount',

  },
  {
    title: '预计手续费(USDT)',
    dataIndex: 'address',
    key: 'address 4',

  },
  {
    title: '预计到帐(USDT)',
    dataIndex: 'amount1',
    key: 'amount1',

  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',

    scopedSlots: { customRender: 'status' }
  },
  {
    title: '申请时间',
    dataIndex: 'createTime',
    key: 'createTime',

  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    key: 'updateTime',

  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    width: 100
  },
];

const data = [
  {
    id: '1',
    levelName: 'ZX776',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    id: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser'],
  },
  {
    id: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];


export default {
  data(){
    return {
      sjstate: {
        time: 60,
        smsSendBtn: false,
      },
      yxstate: {
        time: 60,
        smsSendBtn: false,
      },
      data,
      columns,
      modal2Visible: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
      isHide: false,
      pasVisible: false,
      detailsModal: false,
      detailsForm:{

      },
      dataForm: {
        free: '',
        balance: '',
        agentVirtualAddress: null,
        withdrawalRecordVos:[]
      },
      tbxxform:{
        protocols:'TRC20',
        phoneCode:'',
        mailCode:'',
        amount:'',
      },
      addAddressModel: false,
      addAddressForm: {
        virtualAddress:'',
        phoneCode:'',
        mailCode:'',
      },
      xyvalue:'a'
    }
    },
    created() {
      this.getPageData();
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),
      xq(e){
        this.detailsForm = e
        this.detailsModal = true
        console.log(e)
      },
      tibi(){
        postAction('/agentuser/agentUser/apply',this.tbxxform).then(res =>{
          console.log("添加提币",res);
          if(res.code == 200){
            this.$message.success('提币成功');
          }else {
            this.$message.error(res.message);
          }
          this.modal2Visible = false;
        }).catch(err =>{
          console.log(err);
        });
      },
      onChange(e) {
        this.tbxxform.protocols = e.target.value
        console.log(e.target.value);
      },
      handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    },
    handleSelectChange(value) {
      console.log(value);
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      });
    },
    // 切换显示
    changehide() {
      console.log("点击");
      console.log(this.userInfo().mail);
      // this.$confirm({
      //   title: '输入支付密码查看',
      //   content: '',
      //   okText: '确认',
      //   cancelText: '取消',
      //   centered: 'true'
      // });
      // this.pasVisible = true;

      this.isHide = !this.isHide;

    },
    //验证输入密码
    verifyCode() {
      this.pasVisible = false;
      this.isHide = !this.isHide;
    },
    onSearch() {

    },
      //发送邮箱验证码
    getyxyzm(){
      console.log('getyxyzm')
      if(this.yxstate.smsSendBtn  == false){
        this.yxstate.smsSendBtn = true;
        let interval = window.setInterval(() => {
          if (this.yxstate.time-- <= 0) {
            this.yxstate.time = 60;
            this.yxstate.smsSendBtn = false;
            window.clearInterval(interval);
          }
        }, 1000);
      }


    },
      //发送手机验证码
    getsjyzm(){
      console.log('getsjyzm')
      if(this.sjstate.smsSendBtn == false){
        this.sjstate.smsSendBtn = true;
        let interval = window.setInterval(() => {
          if (this.sjstate.time-- <= 0) {
            this.sjstate.time = 60;
            this.sjstate.smsSendBtn = false;
            window.clearInterval(interval);
          }
        }, 1000);
      }


      },
      //获取页面数据
    getPageData() {
      getAction('/agentuser/agentUser/drawing').then(res =>{
        console.log(res);
        if(res.success){
          const data = res.result;
          this.dataForm = data;
        }
      }).catch(err =>{
        console.log(err);
      });
    },
    // 添加提币地址
    handleAddAddress() {
      this.modal2Visible = true;
    },
    handleAddAddress2() {
      this.addAddressModel = true;
    },
    submitAddAdress() {
      postAction('/agent/agent/addAddress',this.addAddressForm).then(res =>{
        console.log("添加提币地址",res);
        if(res.code == 200){
          this.$message.success('添加地址成功');
        }else {
          this.$message.error(res.message);
        }
        this.addAddressModel = false;
      }).catch(err =>{
        console.log(err);
      });
    },
    cancelAddAdress() {
      this.addAddressModel = false;
      this.addAddressForm = {};
    }
  }
}

</script>

<style lang="less">
@import '~@assets/less/common.less';
.ant-col-5 {
  display: block;
  box-sizing: border-box;
  width: auto;
  margin-right: .5rem;
}
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

.primary-border-bottom-color {
  border-bottom: 1px solid @primary-color;
}

.primary-border-color {
  border: 1px solid @primary-color;
}

.color-999 {
  color: #999;
}
.tab-item-text{
  display: flex;
  align-items: center;
  img{
    width: 22px;
    margin-left: 10px;
    cursor: pointer;
  }
}
.ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled){
  box-shadow: -0px 0 0 0 #4bb1b1;
}
// 提现申请按钮样式
.apply-btn{
  width: 80px;
  height: 30px;
  border-radius: 30px;
  border: 1px solid #49B1B3;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: #49B1B3;
  cursor: pointer;
}

// 添加提币地址成功后按钮
.add-success-text-style{
  // width: 344px;
  // height: 19px;
  font-size: 16px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: #FFFFFF;
  // line-height: 19px;
  background: #49B1B3;
  border-radius: 20px
}
.margin-right-20{
  margin-right: 20px;
}

// 重写选中框样式
.uncheck-size-style{
  height: 35px !important;
  line-height: 30px !important;
}

.check-box-bag{
  background-image: url(../../../assets/icon/check-box-icon.png)!important;
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
  border: 0 !important;
  border-radius: 0 !important;
  font-size: 14px !important;
  height: 35px !important;
  line-height: 35px !important;
}

//表单不可编辑数据显示样式
.data-disabled-style{
  color: #49B1B3;
  background: #fff;
  border-color: #49B1B3;
  width: 100%;
}

.des-list{
  list-style: none;
  padding-left: 0;
  line-height: 30px;
  color: #333333;
  .des-item{
    display: flex;
    .des-item-title{
      width: 40%;
      display: block;
      font-size: 15px;
      font-weight: 500;
    }
    .des-item-data{
      color: #666666;
      font-size: 14px;
    }
  }
}
.main-color{
  color: #49B1B3 !important;
}
.modal-style{
  background: #49B1B3;
  /deep/.ant-modal-header{
    border-bottom: 0;
  }

  /deep/.ant-modal-title{
    color: #333333;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>