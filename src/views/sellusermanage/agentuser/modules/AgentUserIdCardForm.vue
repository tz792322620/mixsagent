<template>
  <j-form-container :disabled="disabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="所属用户" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="userId">
              <a-input v-model="model.userId" placeholder="请输入所属用户"></a-input>
            </a-form-model-item>
          </a-col>
<!--          <a-col :span="24">-->
<!--            <a-form-model-item label="国家表id" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="countryId">-->
<!--              <a-input-number v-model="model.countryId" placeholder="请输入国家表id" style="width: 100%"/>-->
<!--            </a-form-model-item>-->
<!--          </a-col>-->
          <a-col :span="24">
            <a-form-model-item label="真实名字" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="name">
              <a-input v-model="model.name" placeholder="请输入名字"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="真实姓氏" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="surname">
              <a-input v-model="model.surname" placeholder="请输入姓氏"></a-input>
            </a-form-model-item>
          </a-col>
<!--          <a-col :span="24">-->
<!--            <a-form-model-item label="出生地址" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="birthAddress">-->
<!--              <a-input v-model="model.birthAddress" placeholder="请输入出生地址"></a-input>-->
<!--            </a-form-model-item>-->
<!--          </a-col>-->
<!--          <a-col :span="24">-->
<!--            <a-form-model-item label="出生日期" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="birthDate">-->
<!--              <j-date placeholder="请选择出生日期" v-model="model.birthDate"  style="width: 100%"/>-->
<!--            </a-form-model-item>-->
<!--          </a-col>-->
<!--          <a-col :span="24">-->
<!--            <a-form-model-item label="联系地址" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="contactAddress">-->
<!--              <a-input v-model="model.contactAddress" placeholder="请输入联系地址"></a-input>-->
<!--            </a-form-model-item>-->
<!--          </a-col>-->
<!--          <a-col :span="24">-->
<!--            <a-form-model-item label="证件类型(0:身份证 1:护照 2:驾照)" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="credentialsType">-->
<!--              <a-input-number v-model="model.credentialsType" placeholder="请输入证件类型(0:身份证 1:护照 2:驾照)" style="width: 100%"/>-->
<!--            </a-form-model-item>-->
<!--          </a-col>-->
<!--          <a-col :span="24">-->
<!--            <a-form-model-item label="认证状态：0审核中，1通过，2拒绝" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="status">-->
<!--              <a-input-number v-model="model.status" placeholder="请输入认证状态：0审核中，1通过，2拒绝" style="width: 100%"/>-->
<!--            </a-form-model-item>-->
<!--          </a-col>-->
          <a-col :span="24">
            <a-form-model-item label="身份证号码" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="cardNum">
              <a-input v-model="model.cardNum" placeholder="请输入身份证号码"></a-input>
            </a-form-model-item>
          </a-col>
<!--          <a-col :span="24">-->
<!--            <a-form-model-item label="正面" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="front">-->
<!--              <a-input v-model="model.front" placeholder="请输入正面"></a-input>-->
<!--            </a-form-model-item>-->
<!--          </a-col>-->
<!--          <a-col :span="24">-->
<!--            <a-form-model-item label="背面" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="backend">-->
<!--              <a-input v-model="model.backend" placeholder="请输入背面"></a-input>-->
<!--            </a-form-model-item>-->
<!--          </a-col>-->
<!--          <a-col :span="24">-->
<!--            <a-form-model-item label="手持" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="hand">-->
<!--              <a-input v-model="model.hand" placeholder="请输入手持"></a-input>-->
<!--            </a-form-model-item>-->
<!--          </a-col>-->
<!--          <a-col :span="24">-->
<!--            <a-form-model-item label="视频" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="video">-->
<!--              <a-input v-model="model.video" placeholder="请输入视频"></a-input>-->
<!--            </a-form-model-item>-->
<!--          </a-col>-->
<!--          <a-col :span="24">-->
<!--            <a-form-model-item label="拒绝理由" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="reason">-->
<!--              <a-input v-model="model.reason" placeholder="请输入拒绝理由"></a-input>-->
<!--            </a-form-model-item>-->
<!--          </a-col>-->
<!--          <a-col :span="24">-->
<!--            <a-form-model-item label="认证等级( 0：未认证, 1：基本信息认证 2：审核中, 3：已认证, 4：不通过)" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="authorizeLevel">-->
<!--              <a-input-number v-model="model.authorizeLevel" placeholder="请输入认证等级( 0：未认证, 1：基本信息认证 2：审核中, 3：已认证, 4：不通过)" style="width: 100%"/>-->
<!--            </a-form-model-item>-->
<!--          </a-col>-->
          <a-col :span="24">
            <a-form-model-item label="邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="mail">
              <a-input v-model="model.mail" placeholder="请输入邮箱"></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="手机号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="phone">
              <a-input v-model="model.phone" placeholder="请输入手机号"></a-input>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
  </j-form-container>
</template>
<script>
  import { getAction } from '@/api/manage'
  import { validateDuplicateValue } from '@/utils/util'
  import JFormContainer from '@/components/jeecg/JFormContainer'
 import { VALIDATE_FAILED } from '@/components/jeecg/JVxeTable/utils/vxeUtils.js'
  export default {
    name: 'AgentUserIdCardForm',
    components: {
      JFormContainer
    },
    props:{
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
        validatorRules: {
           userId: [
              { required: true, message: '请输入所属用户!'},
           ],
           cardNum: [
              { required: true, message: '请输入身份证号码!'},
           ],
        },
        confirmLoading: false,
      }
    },
    created () {
    //备份model原始值
      this.modelDefault = JSON.parse(JSON.stringify(this.model));
    },
    methods:{
      initFormData(url,id){
        this.clearFormData()
        if(!id){
          this.edit(this.modelDefault)
        }else{
          getAction(url,{id:id}).then(res=>{
            if(res.success){
              let records = res.result
              if(records && records.length>0){
                this.edit(records[0])
              }
            }
          })
        }
      },
      edit(record){
        this.model = Object.assign({}, record)
      },
      getFormData(){
        let formdata_arr = []
        this.$refs.form.validate(valid => {
          if (valid) {
            let isNullObj = true
            Object.keys(this.model).forEach(key=>{
              if(this.model[key]){
                isNullObj = false
              }
            })
            if(!isNullObj){
              formdata_arr.push(this.model)
            }
          }else{
            this.$emit("validateError","身份信息表单校验未通过");
          }
        })
        return formdata_arr;
      },
       validate(index){
        return new Promise((resolve, reject) => {
          // 验证主表表单
         this.$refs.form.validate(valid => {
            !valid ? reject({ error: VALIDATE_FAILED ,index}) : resolve()
          })
        }).then(values => {
          return Promise.resolve()
        }).catch(error => {
          return Promise.reject(error)
        })

      },
      clearFormData(){
        this.$refs.form.clearValidate()
      },
    }
  }
</script>
