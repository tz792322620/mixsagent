<template>
  <div class="main">
    <a-row type="flex" justify="space-around" align="middle"  style="width: 100%; height: 100vh; margin: 0">
      <a-col :xs="{ span: 0, offset: 0 }" :sm="{ span: 0, offset: 0 }" :md="{ span: 0, offset: 0 }" :lg="{span: 6, offset: 0}" class="text-center">
        <img src="../../assets/new-img-1.webp" width="80%" />
      </a-col>
      <a-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 24, offset: 0 }" :md="{ span: 24, offset: 0 }" :lg="{span: 5, offset: 0}">
        <a-form :form="form" class="user-layout-login auto-width-420" ref="formLogin" id="formLogin">
          <!--      <a-tabs
                  :activeKey="customActiveKey"
                  :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
                  @change="handleTabClick">
                  <a-tab-pane key="tab1" tab="登录">-->
          <div class="login-text">登录</div>
          <a-form-item>
            <a-input
              size="large"
              v-decorator="['username',validatorRules.username,{ validator: this.handleUsernameOrEmail }]"
              type="text"
              placeholder="请输入手机号或邮箱">
              <a-select
                slot="addonBefore"
                v-decorator="['areano', { initialValue: '86' }]"
                style="width: 70px"
              >
                <a-select-option value="86" v-for="(item, index) in quhao" :value="item.area_no" :key="index">
                  {{ item.area_no }}
                </a-select-option>

              </a-select>
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              v-decorator="['password',validatorRules.password]"
              size="large"
              type="password"
              autocomplete="false"
              placeholder="密码">
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-row :gutter="16">
            <a-col class="gutter-row" :span="16">
              <a-form-item>
                <a-input
                  v-decorator="['captcha',validatorRules.captcha]"
                  size="large"
                  type="text"
                  placeholder="请输入验证码">
                  <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col class="gutter-row" :span="8">
              <a-button
                class="getCaptcha"
                tabindex="-1"
                :disabled="state.smsSendBtn"
                @click.stop.prevent="getCaptcha"
                v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"></a-button>
            </a-col>
          </a-row>
          <div style="width: 50%;color: #4bb1b1;" @click="wjmmvisible = true">
            找回密码
          </div>
          <a-form-item style="margin-top:24px">
            <a-button
              size="large"
              type="primary"
              htmlType="submit"
              class="login-button"
              :loading="loginBtn"
              @click.stop.prevent="handleSubmit"
              :disabled="loginBtn">确定
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"></two-step-captcha>
    <login-select-tenant ref="loginSelect" @success="loginSelectOk"></login-select-tenant>
    <!--    <third-login ref="thirdLogin"></third-login>-->

    <!-- 忘记登陆密码 -->
    <a-modal v-model="wjmmvisible" title="找回密码修改" centered @ok="() => (wjmmvisible = false)" :footer="null">
      <div style="display: flex;margin-bottom: 20px;">
        <div @click="qh(0)" :class="isphon ? 'phonec' :' ' " >手机找回</div>
        <div @click="qh(1)" style="margin-left: 20px"  :class="isphon ? '' :'phonec' ">邮箱找回</div>
      </div>
      <a-form :form="wjmm" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-form-item >
          <a-input-group v-if="isphon" >
            <a-row :gutter="8">
              <a-col :span="5">
                <a-input v-model="wjmm.areaCode" default-value="86" />
              </a-col>
              <a-col :span="19">
                <a-input v-model="wjmm.username" placeholder="请输入手机账号"/>
              </a-col>
            </a-row>
          </a-input-group>

          <a-input v-if="!isphon" v-model="wjmm.username" placeholder="请输入邮箱" />
        </a-form-item>
        <a-form-item  >
          <a-input-password v-model="wjmm.newPassword"  placeholder="新密码" />
        </a-form-item>
        <a-form-item  >
          <a-input-password v-model="wjmm.confirmNewPassword"  placeholder="确认密码" />
        </a-form-item>

        <a-row :gutter="16">
          <a-col class="gutter-row" :span="16">
            <a-form-item>
              <a-input v-if="isphon" v-model="wjmm.smsCode" placeholder="请输入验证码"/>
              <a-input v-if="!isphon" v-model="wjmm.mailCode" placeholder="请输入验证码"/>
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="8">
            <a-button
              class="getCaptcha"
              tabindex="-1"
              :disabled="states.smsSendBtn"
              @click.stop.prevent="getCaptchas"
              v-text="!states.smsSendBtn && '获取验证码' || (states.time+' s')"></a-button>
          </a-col>
        </a-row>
      </a-form>
      <div class="d-flex justify-space-around">
        <a-button class="canc-btn" @click="cancewjmm">取消</a-button>
        <a-button class="sub-btn" @click="submitwjmm">确定</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script>
//import md5 from "md5"
import api from '@/api'
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import { mapActions } from "vuex"
import { timeFix } from "@/utils/util"
import Vue from 'vue'
import { ACCESS_TOKEN ,ENCRYPTED_STRING} from "@/store/mutation-types"
import { putAction,postAction,getAction } from '@/api/manage'
import { getSmsCaptcha } from '@/api/login'

import { encryption , getEncryptedString } from '@/utils/encryption/aesEncrypt'
import store from '@/store/'
import { USER_INFO } from "@/store/mutation-types"
import ThirdLogin from './third/ThirdLogin'
import LoginSelectTenant from "./LoginSelectTenant";
export default {
  components: {
    LoginSelectTenant,
    TwoStepCaptcha,
    ThirdLogin
  },
  data () {
    return {
      quhao:[],
      wjmmvisible:false,
      customActiveKey: "phone",
      loginBtn: false,
      wjmm:{},
      isphon:true,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      encryptedString:{
        key:"",
        iv:"",
      },
      state: {
        time: 60,
        smsSendBtn: false,
      },
      states: {
        time: 60,
        smsSendBtn: false,
      },
      validatorRules:{
        username:{rules: [{ required: true, message: '请输入手机号或邮箱!'},{validator: this.handleUsernameOrEmail}]},
        password:{rules: [{ required: true, message: '请输入密码!',validator: 'click'}]},
        mobile:{rules: [{validator:this.validateMobile}]},
        captcha:{rule: [{ required: true, message: '请输入验证码!'}]},
        inputCode:{rules: [{ required: true, message: '请输入验证码!'}]}
      },
      verifiedCode:"",
      inputCodeContent:"",
      inputCodeNull:true,
      currentUsername:"",
      currdatetime:'',
      randCodeImage:'',
      requestCodeSuccess:false,


      infoDialog: true
    }
  },
  created () {
    this.currdatetime = new Date().getTime();
    Vue.ls.remove(ACCESS_TOKEN)
    this.getRouterData();
    this.getListbd();
    this.handleChangeCheckCode();
    // update-begin- --- author:scott ------ date:20190805 ---- for:密码加密逻辑暂时注释掉，有点问题
    //this.getEncrypte();
    // update-end- --- author:scott ------ date:20190805 ---- for:密码加密逻辑暂时注释掉，有点问题
  },
  methods: {
    ...mapActions(['Login', 'Logout', 'PhoneLogin']),
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      const regex2 = /^\d{11}$/;
      console.log("value:"+value)
      if (regex.test(value)||regex2.test(value)) {
        this.loginType = 0
      } else {
        this.loginType = 1
      }
      callback()
    },
    handleTabClick (key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    // 查询区号
    getListbd() {
      getAction('/business/area/getAreaList')
        .then(res => {
          this.quhao = res.result
          console.log(this.quhao)
        })
    },
    cancewjmm(){
      this.wjmm = {}
      this.wjmmvisible = false
    },
    submitwjmm(){
      postAction('/sys/passwordForget',this.wjmm).then(res =>{
        console.log(res)
        if (res.code == 200){
          this.$notification.success({
            message: '提示',
            description: res.message,
          });
          this.wjmmvisible = false
        }else {
          this.$notification[ 'error' ]({
            message: '提示',
            description: res.message,
          });
        }
      })
    },
    qh(e){
      if(e == 0){
        this.isphon = true;
      }else {
        this.isphon = false;
      }
    },
    handleSubmit () {
      let that = this
      let loginParams = {};
      that.loginBtn = true;

      console.log()
      // 使用账户密码登录
      if (that.customActiveKey === 'tab1') {
        that.form.validateFields([ 'username', 'password','inputCode', 'rememberMe' ], { force: true }, (err, values) => {
          if (!err) {
            loginParams.username = values.username
            // update-begin- --- author:scott ------ date:20190805 ---- for:密码加密逻辑暂时注释掉，有点问题
            //loginParams.password = md5(values.password)
            //loginParams.password = encryption(values.password,that.encryptedString.key,that.encryptedString.iv)
            loginParams.password = values.password
            loginParams.remember_me = values.rememberMe
            // update-begin- --- author:scott ------ date:20190805 ---- for:密码加密逻辑暂时注释掉，有点问题
            loginParams.captcha = that.inputCodeContent
            loginParams.checkKey = that.currdatetime
            console.log("登录参数",loginParams)
            that.Login(loginParams).then((res) => {
              this.$refs.loginSelect.show(res.result)
            }).catch((err) => {
              that.requestFailed(err);
            });


          }else {
            that.loginBtn = false;
          }
        })
        // 使用手机号登录
      } else {
        that.form.validateFields([ 'username', 'captcha', 'password', 'areano' ], { force: true }, (err, values) => {
          if (!err) {
            // debugger
            loginParams.username = values.username;
            loginParams.password = values.password;
            loginParams.type = 0;
            loginParams.captcha = values.captcha;
            loginParams.code = values.areano

            that.Login(loginParams).then((res) => {
              console.log(res.result);
              this.$refs.loginSelect.show(res.result)
            }).catch((err) => {
              that.requestFailed(err);
            })

          }
        })
      }
    },
    getCaptchas () {
      let that = this;
          if(!that.wjmm.username){
            that.cmsFailed("请输入手机号或邮箱");
          }
            this.states.smsSendBtn = true;
            let interval = window.setInterval(() => {
              if (that.states.time-- <= 0) {
                that.states.time = 60;
                that.states.smsSendBtn = false;
                window.clearInterval(interval);
              }
            }, 1000);

            const hide = this.$message.loading('验证码发送中..', 2);
            let smsParams = {};

            smsParams.phoneOrMail=that.wjmm.username;
            //默认手机号  手机号传code
            smsParams.type = 0;
            smsParams.code = '86'
            var fsyxtype = 0
            var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if(reg.test(that.wjmm.username)){
              fsyxtype = 1

            }else{
              fsyxtype = 0
            }
            // smsParams.smsmode="0";
            getSmsCaptcha(that.wjmm.username,fsyxtype,'86').then(res =>{
              console.log(res);

            }).catch(err => {
              console.log(err);
            })
            return
    },
    getCaptcha (e) {
      e.preventDefault();
      let that = this;
      this.form.validateFields([ 'username' ], { force: true },(err,values) => {
          if(!values.username){
            that.cmsFailed("请输入手机号或邮箱");
          }else if (!err) {
            this.state.smsSendBtn = true;
            let interval = window.setInterval(() => {
              if (that.state.time-- <= 0) {
                that.state.time = 60;
                that.state.smsSendBtn = false;
                window.clearInterval(interval);
              }
            }, 1000);

            const hide = this.$message.loading('验证码发送中..', 2);
            let smsParams = {};

            smsParams.phoneOrMail=values.username;
            //默认手机号  手机号传code
            smsParams.type = 0;
            smsParams.code = '86'
            var fsyxtype = 0
            var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
            if(reg.test(values.username)){
              fsyxtype = 1

            }else{
              fsyxtype = 0
            }
            // smsParams.smsmode="0";
            getSmsCaptcha(values.username,fsyxtype,'86').then(res =>{
              console.log(res);

            }).catch(err => {
              console.log(err);
            })
            return

          }
        }
      );
    },
    stepCaptchaSuccess () {
      this.loginSuccess()
    },
    stepCaptchaCancel () {
      this.Logout().then(() => {
        this.loginBtn = false
        this.stepCaptchaVisible = false
      })
    },
    handleChangeCheckCode(){
      this.currdatetime = new Date().getTime();
      getAction(`/sys/randomImage/${this.currdatetime}`).then(res=>{
        if(res.success){
          this.randCodeImage = res.result
          this.requestCodeSuccess=true
        }else{
          this.$message.error(res.message)
          this.requestCodeSuccess=false
        }
      }).catch(()=>{
        this.requestCodeSuccess=false
      })
    },
    loginSuccess () {
      this.$router.push({ path: "/dashboard/analysis" }).catch(()=>{
        console.log('登录跳转首页出错2,这个错误从哪里来的')
      })
      this.$notification.success({
        message: '欢迎',
        description: `${timeFix()}，欢迎回来`,
      });
    },
    cmsFailed(err){
      this.$notification[ 'error' ]({
        message: "登录失败",
        description:err,
        duration: 4,
      });
    },
    requestFailed (err) {
      this.$notification[ 'error' ]({
        message: '登录失败',
        description: ((err.response || {}).data || {}).message || err.message || "请求出现错误，请稍后再试",
        duration: 4,
      });
      this.loginBtn = false;
    },
    validateMobile(rule,value,callback){
      if (!value || new RegExp(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/).test(value)){
        callback();
      }else{
        callback("您的手机号码格式不正确!");
      }

    },
    validateInputCode(rule,value,callback){
      if(!value || this.verifiedCode==this.inputCodeContent){
        callback();
      }else{
        callback("您输入的验证码不正确!");
      }
    },
    generateCode(value){
      this.verifiedCode = value.toLowerCase()
    },
    inputCodeChange(e){
      this.inputCodeContent = e.target.value
    },
    loginSelectOk(){
      this.loginSuccess()
    },
    getRouterData(){
      this.$nextTick(() => {
        if (this.$route.params.username) {
          this.form.setFieldsValue({
            'username': this.$route.params.username
          });
        }
      })
    },
    //获取密码加密规则
    getEncrypte(){
      var encryptedString = Vue.ls.get(ENCRYPTED_STRING);
      if(encryptedString == null){
        getEncryptedString().then((data) => {
          this.encryptedString = data
        });
      }else{
        this.encryptedString = encryptedString;
      }
    },
  }
}
</script>

<style lang="less" scoped>

.user-layout-login {
  background-color: white;
  padding: 30px;
  border-radius: 10px;

  label {
    font-size: 14px;
  }

  .login-text {
    font-size: 20px;
    text-align: center;
    font-weight: bold;
    margin-bottom: 24px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
    font-size: 12px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0,0,0,.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color .3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}

</style>
<style>



.valid-error .ant-select-selection__placeholder{
  color: #f5222d;
}

.d-flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.align-center {
  align-items: center;
}

.justify-space-between {
  justify-content: space-between;
}

.text-center {
  text-align: center;
}


@media (max-width: 768px) {
  .auto-width-420 {
    width: 90vw;
    margin: 0 auto;
    border-radius: 10px;
  }
}

@media (min-width: 769px) {
  .auto-width-420 {
    width: 420px;
    max-width: 420px;
    border-radius: 10px;
  }
}

/*::v-deep .ant-modal-content .ant-modal-header {*/
/*  border-bottom: none !important;*/
/*}*/

/*::v-deep .ant-modal-content .ant-modal-footer {*/
/*  border-top: none !important;*/
/*}*/


/*.info-box-left {*/
/*  min-width: 100px;*/
/*}*/

/*.info-box-left span {*/
/*  color: red;*/
/*}*/
.phonec{
  color: #4bb1b1;
}
</style>