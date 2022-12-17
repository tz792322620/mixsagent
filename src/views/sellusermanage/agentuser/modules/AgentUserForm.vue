<template>
  <a-spin :spinning="confirmLoading">
    <j-form-container :disabled="formDisabled">
      <!-- 主表单区域 -->
      <a-form-model ref="form" :model="model" :rules="validatorRules" slot="detail">
        <a-row>
          <a-col :span="24" >
            <a-form-model-item label="用户名" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="userName">
              <a-input v-model="model.userName" placeholder="请输入用户名" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24" >
            <a-form-model-item label="区号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="areaCode">
              <a-input v-model="model.areaCode" placeholder="请输入区号" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24" >
            <a-form-model-item label="手机号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="phoneNo">
              <a-input v-model="model.phoneNo" placeholder="请输入手机号" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24" >
            <a-form-model-item label="密码" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="loginPassword">
              <a-input v-model="model.loginPassword" placeholder="请输入密码" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24" >
            <a-form-model-item label="交易密码" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="tradePassword">
              <a-input v-model="model.tradePassword" placeholder="请输入交易密码" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24" >
            <a-form-model-item label="头像链接" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="headPortraitUrl">
              <a-input v-model="model.headPortraitUrl" placeholder="请输入头像链接" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24" >
            <a-form-model-item label="邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="mail">
              <a-input v-model="model.mail" placeholder="请输入邮箱" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24" >
            <a-form-model-item label="上级用户编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="parentId">
              <a-input v-model="model.parentId" placeholder="请输入上级用户编号" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24" >
            <a-form-model-item label="下级用户编号" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="parentIds">
              <a-textarea v-model="model.parentIds"  placeholder="请输入下级用户编号" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24" >
            <a-form-model-item label="邀请码" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="invitationCode">
              <a-input v-model="model.invitationCode" placeholder="请输入邀请码" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24" >
            <a-form-model-item label="谷歌验证是否开启" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="googleStatus">
              <a-input-number v-model="model.googleStatus" placeholder="请输入谷歌验证是否开启" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24" >
            <a-form-model-item label="谷歌认证（秘钥）" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="googleCode">
              <a-input v-model="model.googleCode" placeholder="请输入谷歌认证（秘钥）" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24" >
            <a-form-model-item label="推荐类型" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="type">
              <a-input-number v-model="model.type" placeholder="请输入推荐类型" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24" >
            <a-form-model-item label="是否允许登录" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="loginIs">
              <a-input-number v-model="model.loginIs" placeholder="请输入是否允许登录" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24" >
            <a-form-model-item label="是否允许交易" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="tradeIs">
              <a-input-number v-model="model.tradeIs" placeholder="请输入是否允许交易" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24" >
            <a-form-model-item label="认证等级" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="authorizeLevel">
              <a-input-number v-model="model.authorizeLevel" placeholder="请输入认证等级" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24" >
            <a-form-model-item label="账号状态" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="status">
              <a-input-number v-model="model.status" placeholder="请输入账号状态" style="width: 100%" />
            </a-form-model-item>
          </a-col>
          <a-col :span="24" >
            <a-form-model-item label="uuid" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="uuid">
              <a-input v-model="model.uuid" placeholder="请输入uuid" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24" >
            <a-form-model-item label="orgCode" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="orgCode">
              <a-input v-model="model.orgCode" placeholder="请输入orgCode" ></a-input>
            </a-form-model-item>
          </a-col>
          <a-col :span="24" >
            <a-form-model-item label="等级" :labelCol="labelCol" :wrapperCol="wrapperCol" prop="level">
              <a-input-number v-model="model.level" placeholder="请输入等级" style="width: 100%" />
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </j-form-container>
      <!-- 子表单区域 -->
    <a-tabs v-model="activeKey" @change="handleChangeTabs">
      <a-tab-pane tab="身份信息" :key="refKeys[0]" :forceRender="true">
        <agent-user-id-card-form ref="agentUserIdCardForm" @validateError="validateError" :disabled="formDisabled"></agent-user-id-card-form>
      </a-tab-pane>
      
      <a-tab-pane tab="用户钱包" :key="refKeys[1]" :forceRender="true">
        <j-vxe-table
          keep-source
          :ref="refKeys[1]"
          :loading="agentUserUserVirtualWalletTable.loading"
          :columns="agentUserUserVirtualWalletTable.columns"
          :dataSource="agentUserUserVirtualWalletTable.dataSource"
          :maxHeight="300"
          :disabled="formDisabled"
          :rowNumber="false"
          :rowSelection="false"
          />
      </a-tab-pane>
    </a-tabs>
  </a-spin>
</template>

<script>

  import { getAction } from '@/api/manage'
  import { JVxeTableModelMixin } from '@/mixins/JVxeTableModelMixin.js'
  import { JVXETypes } from '@/components/jeecg/JVxeTable'
  import { getRefPromise,VALIDATE_FAILED} from '@/components/jeecg/JVxeTable/utils/vxeUtils.js'
  import { validateDuplicateValue } from '@/utils/util'
  import JFormContainer from '@/components/jeecg/JFormContainer'
  import AgentUserIdCardForm from './AgentUserIdCardForm.vue'

  export default {
    name: 'AgentUserForm',
    mixins: [JVxeTableModelMixin],
    components: {
      JFormContainer,
      AgentUserIdCardForm,
    },
    data() {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        model:{
         },
        // 新增时子表默认添加几行空数据
        addDefaultRowNum: 1,
        validatorRules: {
        },
        refKeys: ['agentUserIdCard', 'agentUserUserVirtualWallet', ],
        tableKeys:['agentUserUserVirtualWallet', ],
        activeKey: 'agentUserIdCard',
        // 身份信息
        agentUserIdCardTable: {
          loading: false,
          dataSource: [],
          columns: [
          ]
        },
        // 用户钱包
        agentUserUserVirtualWalletTable: {
          loading: false,
          dataSource: [],
          columns: [
            {
              title: '用户id',
              key: 'userId',
               type: JVXETypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '钱包id',
              key: 'virtualCoinId',
               type: JVXETypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '币种名',
              key: 'virtualCoinName',
               type: JVXETypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '交易后冻结',
              key: 'afterFreeze',
               type: JVXETypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '交易前冻结',
              key: 'beforeFreeze',
               type: JVXETypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '交易前余额',
              key: 'beforeBalance',
               type: JVXETypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '交易后余额',
              key: 'afterBalance',
               type: JVXETypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
            {
              title: '钱包地址',
              key: 'virtualCoinAddress',
               type: JVXETypes.input,
              width:"200px",
              placeholder: '请输入${title}',
              defaultValue:'',
            },
          ]
        },
        url: {
          add: "/agentuser/agentUser/add",
          edit: "/agentuser/agentUser/edit",
          queryById: "/agentuser/agentUser/queryById",
          agentUserIdCard: {
            list: '/agentuser/agentUser/queryAgentUserIdCardByMainId'
          },
          agentUserUserVirtualWallet: {
            list: '/agentuser/agentUser/queryAgentUserUserVirtualWalletByMainId'
          },
        }
      }
    },
    props: {
      //表单禁用
      disabled: {
        type: Boolean,
        default: false,
        required: false
      }
    },
    computed: {
      formDisabled(){
        return this.disabled
      },
    },
    created () {
    },
    methods: {
      addBefore(){
        this.$refs.agentUserIdCardForm.clearFormData()
        this.agentUserUserVirtualWalletTable.dataSource=[]
      },
      getAllTable() {
        let values = this.tableKeys.map(key => getRefPromise(this, key))
        return Promise.all(values)
      },
      /** 调用完edit()方法之后会自动调用此方法 */
      editAfter() {
        this.$nextTick(() => {
          this.$refs.agentUserIdCardForm.initFormData(this.url.agentUserIdCard.list,this.model.id)
        })
        // 加载子表数据
        if (this.model.id) {
          let params = { id: this.model.id }
          this.requestSubTableData(this.url.agentUserUserVirtualWallet.list, params, this.agentUserUserVirtualWalletTable)
        }
      },
      //校验所有一对一子表表单
        validateSubForm(allValues){
            return new Promise((resolve,reject)=>{
              Promise.all([
                  this.$refs.agentUserIdCardForm.validate(0),
              ]).then(() => {
                resolve(allValues)
              }).catch(e => {
                if (e.error === VALIDATE_FAILED) {
                  // 如果有未通过表单验证的子表，就自动跳转到它所在的tab
                  this.activeKey = e.index == null ? this.activeKey : this.refKeys[e.index]
                } else {
                  console.error(e)
                }
              })
            })
        },
      /** 整理成formData */
      classifyIntoFormData(allValues) {
        let main = Object.assign(this.model, allValues.formValue)
        return {
          ...main, // 展开
          agentUserIdCardList: this.$refs.agentUserIdCardForm.getFormData(),
          agentUserUserVirtualWalletList: allValues.tablesValue[0].tableData,
        }
      },
      validateError(msg){
        this.$message.error(msg)
      },

    }
  }
</script>

<style scoped>
</style>