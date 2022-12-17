<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="用户名" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="userName">
              <a-input v-model="model.userName" placeholder="请输入用户名"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="区号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="areaCode">
              <a-input v-model="model.areaCode" placeholder="请输入区号"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="手机号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="phoneNo">
              <a-input v-model="model.phoneNo" placeholder="请输入手机号"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="密码" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="loginPassword">
              <a-input v-model="model.loginPassword" placeholder="请输入密码"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="交易密码" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="tradePassword">
              <a-input v-model="model.tradePassword" placeholder="请输入交易密码"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="头像链接" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="headPortraitUrl">
              <a-input v-model="model.headPortraitUrl" placeholder="请输入头像链接"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="mail">
              <a-input v-model="model.mail" placeholder="请输入邮箱"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="父级id" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="parentId">
              <a-input v-model="model.parentId" placeholder="请输入父级id"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="父级id( 1,2,3,4,5)" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="parentIds">
              <a-input v-model="model.parentIds" placeholder="请输入父级id( 1,2,3,4,5)"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="邀请码" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="invitationCode">
              <a-input v-model="model.invitationCode" placeholder="请输入邀请码"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="谷歌验证是否开启：0：禁用，1开启" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="googleStatus">
              <a-input-number v-model="model.googleStatus" placeholder="请输入谷歌验证是否开启：0：禁用，1开启" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="谷歌认证（秘钥）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="googleCode">
              <a-input v-model="model.googleCode" placeholder="请输入谷歌认证（秘钥）"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="推荐类型(0: 普通用户,1: 商户)" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="type">
              <a-input-number v-model="model.type" placeholder="请输入推荐类型(0: 普通用户,1: 商户)" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="是否允许登录(0: 否,1: 是)" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="loginIs">
              <a-input-number v-model="model.loginIs" placeholder="请输入是否允许登录(0: 否,1: 是)" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="是否允许交易(0: 否,1: 是)" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="tradeIs">
              <a-input-number v-model="model.tradeIs" placeholder="请输入是否允许交易(0: 否,1: 是)" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="认证等级( 0：未认证, 1：基本信息认证 2：审核中, 3：已认证, 4：不通过)" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="authorizeLevel">
              <a-input-number v-model="model.authorizeLevel" placeholder="请输入认证等级( 0：未认证, 1：基本信息认证 2：审核中, 3：已认证, 4：不通过)" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="账号状态：0：禁用，1：启用，2：禁止交易" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="status">
              <a-input-number v-model="model.status" placeholder="请输入账号状态：0：禁用，1：启用，2：禁止交易" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="uuid" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="uuid">
              <a-input v-model="model.uuid" placeholder="请输入uuid"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="orgCode" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="orgCode">
              <a-input v-model="model.orgCode" placeholder="请输入orgCode"  ></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </j-form-container>
  </a-spin>
</template>

<script>

  import { httpAction, getAction } from '@/api/manage'
  import { validateDuplicateValue } from '@/utils/util'

  export default {
    name: 'UserInvitationCodeForm',
    components: {
    },
    props: {
      //表单禁用
      disabled: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    data () {
      return {
        model:{
         },
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        confirmLoading: false,
        validatorRules: {
        },
        url: {
          add: "/userinvitationcode/userInvitationCode/add",
          edit: "/userinvitationcode/userInvitationCode/edit",
          queryById: "/userinvitationcode/userInvitationCode/queryById"
        }
      }
    },
    computed: {
      formDisabled(){
        return this.disabled
      },
    },
    created () {
       //备份model原始值
      this.modelDefault = JSON.parse(JSON.stringify(this.model));
    },
    methods: {
      add () {
        this.edit(this.modelDefault);
      },
      edit (record) {
        this.model = Object.assign({}, record);
        this.visible = true;
      },
      submitForm () {
        const that = this;
        // 触发表单验证
        this.$refs.form.validate(valid => {
          if (valid) {
            that.confirmLoading = true;
            let httpurl = '';
            let method = '';
            if(!this.model.id){
              httpurl+=this.url.add;
              method = 'post';
            }else{
              httpurl+=this.url.edit;
               method = 'put';
            }
            httpAction(httpurl,this.model,method).then((res)=>{
              if(res.success){
                that.$message.success(res.message);
                that.$emit('ok');
              }else{
                that.$message.warning(res.message);
              }
            }).finally(() => {
              that.confirmLoading = false;
            })
          }
         
        })
      },
    }
  }
</script>