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
              <span v-else>{{balance}}</span>
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
              <span v-else>{{free}}</span>
              <div class="icon" @click="changehide">
                <img v-if="isHide" src="../../../assets/icon/eye.svg" />
                <img v-else src="../../../assets/icon/eye-hide.svg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="my-5 d-flex">
        <div v-if="tbdz == null" type="primary" shape="round" class="primary-border-color px-4 py-1 primary-color" style="border-radius: 15px;cursor:pointer;" @click="handleAddAddress2()" >添加提币地址</div>
        <!-- 添加提币成功后显示样式  对接数据后启用 -->
        <div v-if="tbdz != null" class="add-success-text-style px-4 py-1" @click="handleAddAddress2()">{{tbdz}}</div>
      </div>
      <a-table  :columns="columns" :data-source="dataForm.withdrawalRecordVos"          :pagination="ipagination"
                @change="handleTableChange"  bordered class="mt-4">

        <template slot="status" slot-scope="status">

            <span v-if="status == 0">审核中</span>
            <span v-if="status == 1">二级审核通过</span>
            <span v-if="status == 2">一级审核通过</span>
            <span v-if="status == 3">二级审核拒绝</span>
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
        <a-form-item v-if="phoneNo != null">

          <div style="display: flex">

            <a-input style="width: 8rem;"  a-input v-model="addAddressForm.phoneCode"  placeholder="请输入手机验证码"  >
            </a-input>
            <a-button style="width: 8rem;"  @click.stop.prevent="getsjyzm()"  v-text="!yxstate.smsSendBtn && '获取验证码' || (yxstate.time+' s')">
            </a-button>
          </div>
        </a-form-item>
        <a-form-item v-if="mail != null">

          <div style="display: flex">
            <a-input style="width: 8rem;"  a-input v-model="addAddressForm.mailCode"  placeholder="请输入邮箱验证码"  >
            </a-input>
            <a-button style="width: 8rem;"  @click.stop.prevent="getyxyzm()"  v-text="!yxstate.smsSendBtn && '获取验证码' || (yxstate.time+' s')">
            </a-button>
          </div>
        </a-form-item>


        <a-form-item v-if="mail == null">
          <div style="display: flex">

            <a-input style="width: 8rem;"  a-input v-model="tbxxform.mailCode"  placeholder="请输入邮箱验证码"  >
            </a-input>
            <a-button style="width: 10rem;"    v-text="'请先绑定邮箱'">
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
        <a-form-item label="提币地址:"  >
          <a-input v-model="tbxxform.virtualAddress"  placeholder="请输入提币地址"  :disabled="true"/>
        </a-form-item>
        <a-form-item label="确认地址:"  >
          <a-input v-model="tbxxform.qrvirtualAddress"  placeholder="请再次输入提币地址"  :disabled="true" />
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
        <a-form-item v-if="phoneNo != null">
          <div style="display: flex">
            <a-input style="width: 8rem;" a-input v-model="tbxxform.phoneCode"  placeholder="请输入手机验证码"  >
            </a-input>
            <a-button style="width: 8rem;"   @click.stop.prevent="getsjyzm()" v-text="!sjstate.smsSendBtn && '获取验证码' || (sjstate.time+' s')">
            </a-button>
          </div>

        </a-form-item>
        <a-form-item v-if="mail != null">
          <div style="display: flex">

            <a-input style="width: 8rem;"  a-input v-model="tbxxform.mailCode"  placeholder="请输入邮箱验证码"  >
            </a-input>
            <a-button style="width: 8rem;"  @click.stop.prevent="getyxyzm()"  v-text="!yxstate.smsSendBtn && '获取验证码' || (yxstate.time+' s')">
            </a-button>
          </div>

        </a-form-item>

        <a-form-item v-if="mail == null">
          <div style="display: flex">

            <a-input style="width: 8rem;"  a-input v-model="tbxxform.mailCode"  placeholder="请输入邮箱验证码"  >
            </a-input>
            <a-button style="width: 10rem;"    v-text="'请先绑定邮箱'">
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
            v-model="yzmm"
            v-decorator="['note', { rules: [{ required: true, message: '请输入支付密码' }] }]" placeholder="请输入支付密码"
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
          <span class="des-item-data main-color">{{ detailsForm.commissionCharge }} </span>
        </li>
        <li class="des-item">
          <span class="des-item-title">到账(USDT)：</span>
          <span class="des-item-data main-color">{{ detailsForm.actualAmount }} </span>
        </li>

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
          <span class="des-item-title">发起时间：</span>
          <span class="des-item-data">{{ detailsForm.createTime }} </span>
        </li>
        <li class="des-item">
          <span class="des-item-title">结束时间：</span>
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
import { getSmsCaptcha,sendCaptchaAddress } from '@/api/login'
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
    title: '提现地址',
    dataIndex: 'virtualAddress',
    key: 'virtualAddress',

  },
  // {
  //   title: '虚拟币账户',
  //   dataIndex: 'virtualAddress',
  //   key: 'virtualAddress',
  //
  // },
  {
    title: '提款金额(USDT)',
    dataIndex: 'amount',
    key: 'amount',

  },
  {
    title: '预计手续费(USDT)',
    dataIndex: 'commissionCharge',
    key: 'commissionCharge',

  },
  {
    title: '预计到帐(USDT)',
    dataIndex: 'actualAmount',
    key: 'actualAmount',

  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',

    scopedSlots: { customRender: 'status' }
  },
  {
    title: '发起时间',
    dataIndex: 'createTime',
    key: 'createTime',

  },
  {
    title: '结束时间',
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
      ipagination:{
        current: 1,
        pageSize: 20,
        pageSizeOptions: ['10', '20', '30'],
        showTotal: (total, range) => {
          return range[0] + "-" + range[1] + " 共" + total + "条"
        },
        showQuickJumper: true,
        showSizeChanger: true,
        total: 0,

      },
      tbdz:'',
      mail:'',
      phoneNo:'',
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
        qrvirtualAddress:'',
        virtualAddress:'',
        protocols:'TRC20',
        phoneCode:'',
        mailCode:'',
        amount:'',
      },
      addAddressModel: false,
      addAddressForm: {
        qrvirtualAddress:'',
        virtualAddress:'',
        phoneCode:'',
        mailCode:'',
      },
      xyvalue:'a',
      yzmm:'',
      balance:'',
      free:''
    }
    },
    created() {
      this.getPageData();
    },
    methods: {
      ...mapGetters(["nickname", "avatar","userInfo"]),
      handleTableChange(pagination, filters, sorter){
        //TODO 筛选
        if (Object.keys(sorter).length>0){
          this.isorter.column = sorter.field;
          this.isorter.order = "ascend"==sorter.order?"asc":"desc"
        }
        this.ipagination = pagination;
        this.loadData();
      },
      xq(e){
        this.detailsForm = e
        this.detailsModal = true
        console.log(e)
      },
      tibi(){
        if (this.tbxxform.qrvirtualAddress != this.tbxxform.virtualAddress){
          this.$message.error('确认地址不一致');
          return
        }
        if (this.tbxxform.amount == null || this.tbxxform.amount <= 0){
          this.$message.error('提币数量不能为0或者空');
          return
        }
        console.log('手机或邮箱验证码不能为空')
        console.log(this.tbxxform.phoneCode)
        if (this.tbxxform.phoneCode == null || this.tbxxform.mailCode  == null){
          this.$message.error('手机或邮箱验证码不能为空');
          return
        }
        if (!this.tbxxform.phoneCode || !this.tbxxform.mailCode){
          this.$message.error('手机或邮箱验证码不能为空');
          return
        }

        postAction('/agentuser/agentUser/apply',this.tbxxform).then(res =>{
          console.log("添加提币",res);
          if(res.code == 200){
            this.getPageData();
            this.$message.success('提币成功');
          }else {
            this.getPageData();
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
      if (!this.isHide){
        this.pasVisible = true;
      }else {
        this.isHide = false;
      }

    },
    //验证输入密码
    verifyCode() {
      postAction('/withdrawal/withdrawal/getCommissionBalance',{password:this.yzmm}).then(res =>{
        console.log("验证输入密码",res);
        if(res.code == 200){
          this.balance = res.result.afterBalance;
          this.free = res.result.afterFreeze;
          this.pasVisible = false;
          this.isHide = !this.isHide;
        }else {
          this.$message.error(res.message);
          this.pasVisible = false;
        }
        this.addAddressModel = false;
      }).catch(err =>{
        console.log(err);
      });

    },
    onSearch() {

    },
      //发送邮箱验证码
    getyxyzm(){
      console.log(this.userInfo().mail)
      if (this.mail == null){
        this.$message.error('邮箱不能为空');
        return
      }
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

      sendCaptchaAddress(this.mail,1,'86').then(res =>{
        console.log(res);

      }).catch(err => {
        console.log(err);
      })


    },
      //发送手机验证码
    getsjyzm(){
      if (this.phoneNo == null){
        this.$message.error('手机号不能为空');
        return
      }
      console.log(this.userInfo().phoneNo)
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

      sendCaptchaAddress(this.phoneNo,0,'86').then(res =>{
        console.log(res);

      }).catch(err => {
        console.log(err);
      })

      },
      //获取页面数据
    getPageData() {
      this.mail = this.userInfo().mail
      this.phoneNo = this.userInfo().phoneNo
      console.log(this.mail);
      console.log(this.phoneNo);
      getAction('/agentuser/agentUser/drawing').then(res =>{
        console.log(res);
        if(res.success){
          const data = res.result;
          this.dataForm = data;
        }
      }).catch(err =>{
        console.log(err);
      });

      getAction('/agent/agent/address').then(res =>{
        console.log(res);
        if(res.success){
          const data = res.result;
          this.tbdz = data;
          // this.addAddressForm.virtualAddress= data;
          this.tbxxform.qrvirtualAddress= data;
          this.tbxxform.virtualAddress= data;
          console.log(this.tbdz)

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
      if (this.addAddressForm.virtualAddress== null){
        this.$message.error('地址不能为空');
        return
      }

      postAction('/agent/agent/addAddress',this.addAddressForm).then(res =>{
        console.log("添加提币地址",res);
        if(res.code == 200){
          this.getPageData();
          this.$message.success('添加地址成功');
        }else {
          this.getPageData();
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
    width: 100%;
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