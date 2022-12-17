<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="平台类型" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="platformType">
              <a-input-number v-model="model.platformType" placeholder="请输入平台类型：0：币币，1：合约，2：法币" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="交易类型0：开仓手续费1：平仓盈亏.2：平仓手续费" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="tradeType">
              <a-input-number v-model="model.tradeType" placeholder="请输入交易类型0：开仓手续费1：平仓盈亏.2：平仓手续费" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="币种id" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="virtualCoinId">
              <a-input-number v-model="model.virtualCoinId" placeholder="请输入币种id" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="费率" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="rate">
              <a-input v-model="model.rate" placeholder="请输入费率"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="结算周期" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="settlementCycle">
              <a-input-number v-model="model.settlementCycle" placeholder="请输入结算周期" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="是否开启该项收益：0：否，1：是（仅超级管理员可设置）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="isOpen">
              <a-input-number v-model="model.isOpen" placeholder="请输入是否开启该项收益：0：否，1：是（仅超级管理员可设置）" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="代理商id" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="agentId">
              <a-input-number v-model="model.agentId" placeholder="请输入代理商id" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="手续费（0：手续费，1：打包费，2：手续费+打包费）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="type">
              <a-input-number v-model="model.type" placeholder="请输入手续费（0：手续费，1：打包费，2：手续费+打包费）" style="width: 100%" />
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
    name: 'AgentLowerLevelIncomeConfigForm',
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
          add: "/agentlowerlevelincomeconfig/agentLowerLevelIncomeConfig/add",
          edit: "/agentlowerlevelincomeconfig/agentLowerLevelIncomeConfig/edit",
          queryById: "/agentlowerlevelincomeconfig/agentLowerLevelIncomeConfig/queryById"
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