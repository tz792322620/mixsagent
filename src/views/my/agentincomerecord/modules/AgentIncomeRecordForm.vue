<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24">
            <a-form-model-item label="用户id" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="agentId">
              <a-input-number v-model="model.agentId" placeholder="请输入用户id" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="代理商钱包id" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="agentContractVirtualWalletId">
              <a-input-number v-model="model.agentContractVirtualWalletId" placeholder="请输入代理商钱包id" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="记录名" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="recordName">
              <a-input v-model="model.recordName" placeholder="请输入记录名"  ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="type" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="type">
              <a-input-number v-model="model.type" placeholder="请输入type" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="交易金额" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="amount">
              <a-input-number v-model="model.amount" placeholder="请输入交易金额" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="交易后冻结" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="afterFreeze">
              <a-input-number v-model="model.afterFreeze" placeholder="请输入交易后冻结" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="交易前冻结" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="beforeFreeze">
              <a-input-number v-model="model.beforeFreeze" placeholder="请输入交易前冻结" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="交易前余额" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="beforeBalance">
              <a-input-number v-model="model.beforeBalance" placeholder="请输入交易前余额" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="交易后余额" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="afterBalance">
              <a-input-number v-model="model.afterBalance" placeholder="请输入交易后余额" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24">
            <a-form-model-item label="币种id" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="virtualCoinId">
              <a-input-number v-model="model.virtualCoinId" placeholder="请输入币种id" style="width: 100%" />
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
    name: 'AgentIncomeRecordForm',
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
          add: "/agentincomerecord/agentIncomeRecord/add",
          edit: "/agentincomerecord/agentIncomeRecord/edit",
          queryById: "/agentincomerecord/agentIncomeRecord/queryById"
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