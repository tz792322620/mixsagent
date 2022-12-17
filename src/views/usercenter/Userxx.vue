<!-- > 佣金说明 <-->
<template>
  <div class="pa-6" style="background-image: linear-gradient(179deg, #fff, #7cb7b8);">
      <div style="margin: 1rem;">
        <div style="font-size: 1rem;font-weight: bold">个人信息</div>
        <div style="color: #777;margin-top: .5rem;display: flex">
          <div style="letter-spacing: .2rem;">代理账号：</div>
          <div>{{form.phone}}</div>
        </div>
      </div>

    <div style="margin: 1rem;margin-top: 2rem;">
      <div style="font-size: 1rem;font-weight: bold">安全信息</div>
      <div style="color: #777;margin-top: .5rem;display: flex">
        <div style="letter-spacing: .2rem;">支付密码：</div>
        <div class="m-0-5 ys" @click="xgzfvisible = true">修改</div>
<!--        <div class="m-0-5 ys" @click="czzfvisible = true">重置</div>-->
        <div>账户资金提取必备密码</div>
      </div>
      <div style="color: #777;margin-top: .5rem;display: flex">
        <div style="letter-spacing: .2rem;">登陆密码：</div>
        <div class="m-0-5 ys" @click="xgdlvisible = true">修改</div>
        <div>定期修改提升账户安全</div>
      </div>

    </div>

    <div style="margin: 1rem;margin-top: 2rem;">
      <div style="font-size: 1rem;font-weight: bold">代理信息</div>
      <div style="color: #777;margin-top: .5rem;display: flex">
        <div style="letter-spacing: .2rem;">团队成员：</div>
        <div>{{form.agentNumber}}</div>
      </div>
      <div style="color: #777;margin-top: .5rem;display: flex">
        <div style="letter-spacing: .2rem;">合营代码：</div>
        <div>{{form.jyPassWord}}</div>
      </div>
    </div>



    <!-- 修改支付密码 -->
    <a-modal v-model="xgzfvisible" title="修改支付密码" centered @ok="() => (xgzfvisible = false)" :footer="null">
      <a-form :form="xgzf" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-form-item label="原密码">
          <a-input-password v-model="xgzf.ymm"   placeholder="原密码" />
        </a-form-item>
        <a-form-item label="新密码" >
          <a-input-password v-model="xgzf.xmm"  placeholder="新密码" />
        </a-form-item>
        <a-form-item label="确认密码" >
          <a-input-password v-model="xgzf.qrmm"  placeholder="确认密码" />
        </a-form-item>
      </a-form>
      <div class="d-flex justify-space-around">
        <a-button class="canc-btn" @click="cancelxgzf">取消</a-button>
        <a-button class="sub-btn" @click="submitxgzf">确定</a-button>
      </div>
    </a-modal>

    <!-- 重置支付密码 -->
    <a-modal v-model="czzfvisible" title="重置支付密码" centered @ok="() => (czzfvisible = false)" :footer="null">
      <a-form :form="czzf" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-form-item label="原密码">
          <a-input-password v-model="czzf.ymm"   placeholder="原密码" />
        </a-form-item>
        <a-form-item label="新密码" >
          <a-input-password v-model="czzf.xmm"  placeholder="新密码" />
        </a-form-item>
        <a-form-item label="确认密码" >
          <a-input-password v-model="czzf.qrmm"  placeholder="确认密码" />
        </a-form-item>
      </a-form>
      <div class="d-flex justify-space-around">
        <a-button class="canc-btn" @click="cancelczzf">取消</a-button>
        <a-button class="sub-btn" @click="submitczzf">确定</a-button>
      </div>
    </a-modal>

    <!-- 修改登陆密码 -->
    <a-modal v-model="xgdlvisible" title="修改登陆密码" centered @ok="() => (xgdlvisible = false)" :footer="null">
      <a-form :form="xgdl" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-form-item label="原密码">
          <a-input-password v-model="xgdl.ymm"   placeholder="原密码" />
        </a-form-item>
        <a-form-item label="新密码" >
          <a-input-password v-model="xgdl.xmm"  placeholder="新密码" />
        </a-form-item>
        <a-form-item label="确认密码" >
          <a-input-password v-model="xgdl.qrmm"  placeholder="确认密码" />
        </a-form-item>
      </a-form>
      <div class="d-flex justify-space-around">
        <a-button class="canc-btn" @click="cancelxgdl">取消</a-button>
        <a-button class="sub-btn" @click="submitxgdl">确定</a-button>
      </div>
    </a-modal>

  </div>
</template>

<script>
import { httpAction, getAction,postAction } from '@/api/manage'
export default {
  name: '',
  data() {
    return {
      xgzfvisible:false,
      xgzf:{},
      czzfvisible:false,
      czzf:{},
      xgdlvisible:false,
      xgdl:{},
      form:{},
    }
  },
  watch: {},
  created() {
    this.getPageData();
  },
  methods: {

    cancelxgzf(){
      this.xgzfvisible = false
    },
    submitxgzf(){
      let data ={}
      console.log(this.xgzf)
      data.newPassword = this.xgzf.xmm
      data.confirmPassword = this.xgzf.qrmm
      data.oldPassword = this.xgzf.ymm
      postAction('/sys/paymentPasswordReset',data).then(res =>{
        console.log(res)
        if (res.code == 200){
          this.$notification.success({
            message: '提示',
            description: res.message,
          });
          this.xgzfvisible = false
        }else {
          this.$notification[ 'error' ]({
            message: '提示',
            description: res.message,
          });
        }
      })
    },

    cancelczzf(){

    },
    submitczzf(){

    },

    cancelxgdl(){
      this.xgdlvisible =false
    },
    submitxgdl(){
      let data ={}
      data.newPassword = this.xgdl.xmm
      data.confirmNewPassword = this.xgdl.qrmm
      data.oldPassword = this.xgdl.ymm
      postAction('/sys/agentPasswordChange',data).then(res =>{
        console.log(res)
        if (res.code == 200){
          this.$notification.success({
            message: '提示',
            description: res.message,
          });
          this.xgdlvisible = false
        }else {
          this.$notification[ 'error' ]({
            message: '提示',
            description: res.message,
          });
        }
      })
    },
    getPageData() {
      getAction('/agent/agent/findAgentInfo',).then(res =>{
        console.log("数据",res);
        if(res.success) {
          this.form = res.result;
        }
      }).catch(err =>{
        console.log(err);
      })
    }
  },
}
</script>

<style scoped lang="less">
@import '~@assets/less/common.less';
.m-0-5{
  margin: 0 0.5rem;
}
.ys{
  color: #49B1B3;
}
.primary-color {
  color: @primary-color;
}
.primary-border-bottom-color {
  border-bottom: 1px solid @primary-color;
}
.title {
  color: #333333;
  font-size: 16px;
  margin-top: 40px;
  font-weight: 600;
}
.rules-list {
  line-height: 30px;
  margin-top: 30px;
  font-size: 16px;
  font-size: 500;
}
.tips {
  color: #ff4a4a;
  font-size: 22px;
  font-weight: 500;
}
</style>
