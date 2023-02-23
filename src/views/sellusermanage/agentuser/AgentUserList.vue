<template>
  <div  class="pa-6">
    <div class="card  pa-6" v-if="showType == 'list'" :bordered="false">
      <!-- 查询区域 -->
      <div v-if="false">

        <div class="table-page-search-wrapper">
          <a-form layout="inline" @keyup.enter.native="searchQuery">
            <a-row :gutter="24"> </a-row>
          </a-form>
        </div>
        <!-- 查询区域-END -->

        <!-- 操作按钮区域 -->
        <div class="table-operator">
          <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>
          <a-button type="primary" icon="download" @click="handleExportXls('用户列表')">导出</a-button>
          <a-upload
            name="file"
            :showUploadList="false"
            :multiple="false"
            :headers="tokenHeader"
            :action="importExcelUrl"
            @change="handleImportExcel"
          >
            <a-button type="primary" icon="import">导入</a-button>
          </a-upload>
          <!-- 高级查询区域 -->
          <j-super-query
            :fieldList="superFieldList"
            ref="superQueryModal"
            @handleSuperQuery="handleSuperQuery"
          ></j-super-query>
          <a-dropdown v-if="selectedRowKeys.length > 0">
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="batchDel"><a-icon type="delete" />删除</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down"/></a-button>
          </a-dropdown>
        </div>
      </div>
      <div class="title-top">
        <div class="font-size-30 font-bold">用户管理</div>
        <div class="btn" @click="handleRefe"><a-icon type="redo" />刷新</div>
      </div>
      <!-- 查询 -->
      <div style="margin-bottom: 30px">
        <a-form :form="searchForm" :rules="searchRules" :label-col="{ span: 6 }" :wrapper-col="{ span: 8 }">

          <div class="d-flex mt-6">
            <div class="d-flex">
              <div class="d-flex align-center">
                <a-form-item label="会员账号">
                  <a-input placeholder="请输入会员账号" v-model="searchForm.name" style="width: 220px"></a-input>
                </a-form-item>
              </div>
            </div>
            <div class="px-6"></div>
            <div class="d-flex align-center">
              <!-- <div class="min-width-80px">注册时间:</div> -->
              <a-form-item label="注册时间：">
                <a-range-picker
                  style="width: 220px"
                  v-model="searchForm.time"
                  format="YYYY-MM-DD"
                  valueFormat="YYYY-MM-DD"
                ></a-range-picker>
              </a-form-item>
            </div>
<!--            <div class="d-flex">-->
<!--              <div class="d-flex align-center">-->
<!--                &lt;!&ndash; <div class="min-width-80px">存款金额:</div> &ndash;&gt;-->
<!--                <a-form-item label="存款金额">-->
<!--                  <a-input placeholder="最小金额   -    最大金额" style="width: 220px"></a-input>-->
<!--                </a-form-item>-->
<!--              </div>-->
<!--            </div>-->
          </div>
          <div class="d-flex">
            <!-- <div class="d-flex align-center">
            <div class="min-width-80px">投注时间:</div>
            <a-range-picker style="width: 220px"></a-range-picker>
          </div> -->
            <!-- <div class="px-6"></div> -->

            <div class="px-6"></div>
            <div>
              <a-button class="mr-6 search-btn-circle" type="primary" @click="search">筛选</a-button>
              <a-button class="clear-btn-circle" @click="clear">重置</a-button>
            </div>
          </div>
        </a-form>
      </div>

      <!-- table区域-begin -->
      <div>
        <div class="ant-alert ant-alert-info" style="margin-bottom: 16px">
          <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择
          <a style="font-weight: 600">{{ selectedRowKeys.length }}</a
          >项
          <a style="margin-left: 24px" @click="onClearSelected">清空</a>
        </div>

        <a-table
          ref="table"
          size="middle"
          bordered
          rowKey="id"
          class="j-table-force-nowrap"

          :columns="columns"
          :dataSource="dataSource"
          :pagination="ipagination"
          :loading="loading"
          :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          @change="handleTableChange"
        >
          <template slot="type" slot-scope="text, record">
            <div :key="record.type">
              <span v-if="record.type == 0">普通用户</span>
              <span v-if="record.type == 1">{{record.level}}级代理</span>
            </div>
          </template>
          <template slot="loginIs" slot-scope="loginIs">
            <div :key="loginIs">
              <span v-if="loginIs == 0">否</span>
              <span v-if="loginIs == 1">是</span>
            </div>
          </template>

          <template slot="authorizeLevel" slot-scope="authorizeLevel">
            <div :key="authorizeLevel">
              <span v-if="authorizeLevel == 0">未认证</span>
              <span v-if="authorizeLevel == 1">基本信息认证</span>
              <span v-if="authorizeLevel == 2">审核中</span>
              <span v-if="authorizeLevel == 3">已认证</span>
              <span v-if="authorizeLevel == 4">不通过</span>
            </div>
          </template>

          <template slot="status" slot-scope="status">
            <div :key="status">
              <span v-if="status == 0">禁用</span>
              <span v-if="status == 1">启用</span>
              <span v-if="status == 2">禁止交易</span>
            </div>
          </template>

          <template slot="htmlSlot" slot-scope="text">
            <div v-html="text"></div>
          </template>
          <template slot="imgSlot" slot-scope="text, record">
            <span v-if="!text" style="font-size: 12px; font-style: italic">无图片</span>
            <img
              v-else
              :src="getImgView(text)"
              :preview="record.id"
              height="25px"
              alt=""
              style="max-width: 80px; font-size: 12px; font-style: italic"
            />
          </template>
          <template slot="fileSlot" slot-scope="text">
            <span v-if="!text" style="font-size: 12px; font-style: italic">无文件</span>
            <a-button v-else :ghost="true" type="primary" icon="download" size="small" @click="downloadFile(text)">
              下载
            </a-button>
          </template>

          <span slot="action" slot-scope="text, record">
            <a class="table-handle-btn" @click="handleDetail(record.id)">详情</a>
            <!-- <a-divider  v-if="record.type == 1 || (record.type == 0 && record.authorizeLevel == 3)" type="vertical" /> -->
            <a-dropdown v-if="record.type == 1 || (record.type == 0 && record.authorizeLevel == 3)">
              <a class="ant-dropdown-link table-handle-btn">更多 <a-icon type="down"/></a>
              <a-menu slot="overlay">
                <!-- 代理用户显示编辑 -->
<!--                <a-menu-item>-->
<!--                  <a v-if="record.type == 1" @click="handleEdit">编辑</a>-->
<!--                </a-menu-item>-->
                <!-- 代理用户显示取消，非代理用户显示设为代理并提交信息 -->
                <a-menu-item v-if="record.type == 0 && record.authorizeLevel == 3">
                  <a @click="setAuth(record)">设为代理</a>
                </a-menu-item>
                <a-menu-item v-if="record.type == 1">
                  <a @click="jbdl(record)">取消代理</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </a-table>
      </div>

      <agent-user-modal ref="modalForm" @ok="modalFormOk" />

      <!-- 设置代理 -->
      <a-modal v-model="visible" title="设为代理" centered  :footer="null">
        <a-form :form="agentsForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-form-item label="代理等级">
            <a-select style="width: 100%" v-model:value="agentsForm.level" placeholder="请选择代理等级">
              <a-select-option value="0" v-if="yhxx.level < 1">1</a-select-option>
              <a-select-option value="1" v-if="yhxx.level < 2">2</a-select-option>
              <a-select-option value="2" v-if="yhxx.level < 3">3</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="佣金类型">
            <a-select style="width: 100%" v-model:value="agentsForm.fType" placeholder="请选择佣金类型">
              <a-select-option value="0">手续费</a-select-option>
              <a-select-option value="1">打包</a-select-option>
              <a-select-option value="2">手续费+打包</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="佣金比例">
            <a-input v-model.number="agentsForm.rate" placeholder="请输入分佣比(%)" suffix="%"/>
          </a-form-item>
          <a-form-item label="结算时间">
            <a-select
              style="width: 100%"
              v-model:value="agentsForm.settlementCycle"
              placeholder="请选择结算类型（D/T）"
            >
              <a-select-option value="0" v-if="yhxx.settlementCycle <= 1">日结</a-select-option>
              <a-select-option value="1" v-if="yhxx.settlementCycle <= 2">周结</a-select-option>
              <a-select-option value="2" v-if="yhxx.settlementCycle <= 3">月结</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="结算类型">
            <a-select style="width: 100%" v-model:value="agentsForm.tradeType" placeholder="请选择结算类型（D/T）">
              <a-select-option value="0">D(工作日+节假日)</a-select-option>
              <a-select-option value="1">T(工作日)</a-select-option>
<!--              <a-select-option value="2">W(周)</a-select-option>-->
<!--              <a-select-option value="3">M(月)</a-select-option>-->
            </a-select>
          </a-form-item>

        </a-form>
        <div class="d-flex justify-space-around">
          <a-button class="canc-btn" @click="cancelAuth">取消</a-button>
          <a-button class="sub-btn" @click="submitAuth">确定</a-button>
        </div>
      </a-modal>
    </div>

    <!--    显示详情-->
    <div v-if="showType == 'detail'">
      <AgentUserBaseInfo :id="showInfoId" @back="closeInfoPage" />
    </div>

    <!--    修改弹窗-->
    <a-modal v-model="infoDialog" title="修改信息" centered @ok="() => (infoDialog = false)" :footer="null">
      <div class="info-box">
        <div class="d-flex align-center">
          <div class="info-box-left"><span>*</span> 会员ID：</div>
          <a-input size="large" placeholder="large size" :value="infoDialogData.id" />
        </div>
        <div class="d-flex align-center">
          <div class="info-box-left"><span>*</span> 会员名称：</div>
          <a-input size="large" placeholder="large size" />
        </div>
        <div class="d-flex align-center">
          <div class="info-box-left"><span>*</span> 手机号码：</div>
          <a-input size="large" placeholder="large size" />
        </div>
        <div class="d-flex align-center">
          <div class="info-box-left"><span>*</span> 会员等级：</div>
          <a-input size="large" placeholder="large size" />
        </div>
        <div class="d-flex align-center">
          <div class="info-box-left"><span>*</span> 真实姓名：</div>
          <a-input :disabled="true" size="large" placeholder="large size" />
        </div>
        <div class="d-flex align-center">
          <div class="info-box-left"><span>*</span> 会员邮箱：</div>
          <a-input :disabled="true" size="large" placeholder="large size" />
        </div>
        <div class="d-flex justify-space-around">
          <a-button>取消</a-button>
          <a-button>确定</a-button>
        </div>
      </div>
    </a-modal>

    <!-- 会员信息详情 -->
    <!-- <a-card v-if="!isShowInfoPage" :bordered="false">
    </a-card> -->

    <AgentUserLabelList :isShowLabel.sync="isShowLabel"></AgentUserLabelList>
  </div>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import AgentUserModal from './modules/AgentUserModal'
import AgentUserBaseInfo from './modules/AgentUserBaseInfo'
import AgentUserLabelList from './modules/AgentUserLabelList'
import '@/assets/less/TableExpand.less'
import { httpAction, getAction } from '@/api/manage'
import {postAction, postActions} from '../../../api/manage'
import { isEmail } from '@/utils/validate'

export default {
  name: 'AgentUserList',
  mixins: [JeecgListMixin],
  components: {
    AgentUserModal,
    AgentUserBaseInfo,
    AgentUserLabelList
  },
  data() {
    return {
      yhxx:{},
      type: 1,
      value2: '请输入返佣类型（手续费/打包/手续费+打包）',
      value3: '',
      value4: '',
      value5: '请选择结算周期类型（D/T）',
      visible: false,
      loading: false,
      dlxx: {},
      form: {},
      searchForm: {},
      searchRules: [],
      description: '用户列表管理页面',
      // 表头
      columns: [
        {
          title: 'uuid',
          align: 'center',
          dataIndex: 'uuid'
        },
        {
          title: '用户名',
          align: 'center',
          dataIndex: 'userName'
        },
        {
          title: '区号',
          align: 'center',
          dataIndex: 'areaCode'
        },
        {
          title: '手机号',
          align: 'center',
          dataIndex: 'phoneNo'
        },
        // {
        //   title:'密码',
        //   align:"center",
        //   dataIndex: 'loginPassword'
        // },
        // {
        //   title:'交易密码',
        //   align:"center",
        //   dataIndex: 'tradePassword'
        // },
        // {
        //   title:'头像链接',
        //   align:"center",
        //   dataIndex: 'headPortraitUrl'
        // },
        {
          title: '邮箱',
          align: 'center',
          dataIndex: 'mail'
        },
        // {
        //   title:'上级用户编号',
        //   align:"center",
        //   dataIndex: 'parentId'
        // },
        // {
        //   title:'下级用户编号( 1,2,3,4,5)',
        //   align:"center",
        //   dataIndex: 'parentIds'
        // },
        {
          title: '邀请码',
          align: 'center',
          dataIndex: 'invitationCode'
        },
        // {
        //   title:'谷歌验证是否开启：0：禁用，1开启',
        //   align:"center",
        //   dataIndex: 'googleStatus'
        // },
        // {
        //   title:'谷歌认证（秘钥）',
        //   align:"center",
        //   dataIndex: 'googleCode'
        // },
        {
          title: '推荐类型',
          align: 'center',
          dataIndex: 'type',
          key: 'type',
          scopedSlots: { customRender: 'type' }
        },
        // {
        //   title: '代理等级',
        //   align: 'center',
        //   dataIndex: 'level',
        //   key: 'level',
        //   scopedSlots: { customRender: 'level' }
        // },
        {
          title: '是否允许登录',
          align: 'center',
          dataIndex: 'loginIs',
          key: 'loginIs',
          scopedSlots: { customRender: 'loginIs' }
        },
        {
          title: '是否允许交易',
          align: 'center',
          dataIndex: 'tradeIs',
          key: 'tradeIs',
          scopedSlots: { customRender: 'loginIs' }
        },
        {
          title: '认证等级',
          align: 'center',
          dataIndex: 'authorizeLevel',
          key: 'authorizeLevel',
          scopedSlots: { customRender: 'authorizeLevel' }
        },
        {
          title: '账号状态',
          align: 'center',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'createTime',
          key: 'createTime',
          scopedSlots: { customRender: 'createTime' }
        },
        // {
        //   title:'uuid',
        //   align:"center",
        //   dataIndex: 'uuid'
        // },
        // {
        //   title:'orgCode',
        //   align:"center",
        //   dataIndex: 'orgCode'
        // },
        // {
        //   title:'level',
        //   align:"center",
        //   dataIndex: 'level'
        // },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          // fixed: 'right',
          // width: 147,
          scopedSlots: { customRender: 'action' }
        }
      ],
      dataSource: [],
      url: {
        list: '/agentuser/agentUser/list',
        delete: '/agentuser/agentUser/delete',
        deleteBatch: '/agentuser/agentUser/deleteBatch',
        exportXlsUrl: '/agentuser/agentUser/exportXls',
        importExcelUrl: 'agentuser/agentUser/importExcel',
        daili: '/userlist/userList/editAgents'
      },
      dictOptions: {},
      superFieldList: [],

      isShowInfoPage: false,
      showInfoId: null,

      infoDialog: false,
      infoDialogData: {},
      showType: 'list', //页面显示卡片类型   list  detail  label
      isShowLabel: false,
      pageQuery: {
        pageNo: 1,
        pageSize: 10
      },
      // searchQuery: {},
      agentsForm: {}
    }
  },
  created() {
    // this.getSuperFieldList();
    this.getList()
    this.getYhxx()
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  watch: {
    isShowLabel(newVal) {
      if (newVal == false) {
        this.showType = 'list'
      }
    }
  },
  methods: {
    initDictConfig() {},
    handleOk() {
      console.log(this.dlxx)
      let httpurl = this.url.daili
      let method = 'put'
      let dd = {}
      dd.id = this.dlxx.id
      dd.phone = this.dlxx.phoneNo
      dd.userName = this.dlxx.userName
      dd.type = this.dlxx.type
      dd.value2 = this.value2
      dd.value3 = this.value3
      dd.value4 = this.value4
      dd.value5 = this.value5
      console.log(dd)

      httpAction(httpurl, dd, method).then(res => {
        if (res.success) {
          console.log(res)
          console.log('提示')
          this.visible = false
          this.$notification.success({
            message: '提示',
            description: res.message,
          });
        } else {
          this.visible = false
          this.$notification.success({
            message: '提示',
            description: res.message,
          });
        }
      })

    },
    daili(record) {
      this.visible = true
      this.dlxx = record
    },
    jbdl(record){
      let id = record.id
      postActions('/userlist/userList/disableAgent',{id:id})
        .then(res => {
          console.log('禁止交易', res)
          if (res.success) {
            this.handleRefe()
            this.$notification.success({
              message: '提示',
              description: res.message,
            });
            this.handleRefe()
          }
        })
    },
    getSuperFieldList() {
      let fieldList = []
      fieldList.push({ type: 'string', value: 'userName', text: '用户名' })
      fieldList.push({ type: 'string', value: 'areaCode', text: '区号' })
      fieldList.push({ type: 'string', value: 'phoneNo', text: '手机号' })
      fieldList.push({ type: 'string', value: 'loginPassword', text: '密码' })
      fieldList.push({ type: 'string', value: 'tradePassword', text: '交易密码' })
      fieldList.push({ type: 'string', value: 'headPortraitUrl', text: '头像链接' })
      fieldList.push({ type: 'string', value: 'mail', text: '邮箱' })
      fieldList.push({ type: 'string', value: 'parentId', text: '上级用户编号' })
      fieldList.push({ type: 'string', value: 'parentIds', text: '下级用户编号' })
      fieldList.push({ type: 'string', value: 'invitationCode', text: '邀请码' })
      fieldList.push({ type: 'int', value: 'googleStatus', text: '谷歌验证是否开启' })
      fieldList.push({ type: 'string', value: 'googleCode', text: '谷歌认证（秘钥）' })
      fieldList.push({ type: 'int', value: 'type', text: '推荐类型' })
      fieldList.push({ type: 'int', value: 'loginIs', text: '是否允许登录' })
      fieldList.push({ type: 'int', value: 'tradeIs', text: '是否允许交易' })
      fieldList.push({ type: 'int', value: 'authorizeLevel', text: '认证等级' })
      fieldList.push({ type: 'int', value: 'status', text: '账号状态' })
      fieldList.push({ type: 'string', value: 'uuid', text: 'uuid' })
      fieldList.push({ type: 'string', value: 'orgCode', text: 'orgCode' })
      fieldList.push({ type: 'int', value: 'level', text: 'level' })
      this.superFieldList = fieldList
    },
    getYhxx(){
      getAction('/agent/agent/findAgentInfo',).then(res =>{
        console.log("数据",res);
        if(res.success) {
          this.yhxx = res.result;
        }
      }).catch(err =>{
        console.log(err);
      })
    },
    // 查询列表数据
    getList(searchQuery) {
      this.loading = true
      // debugger
      getAction('agentuser/agentUser/list', Object.assign(this.pageQuery, searchQuery))
        .then(res => {
          // console.log(res);
          if (res.success) {
            const data = res.result.records
            this.dataSource = data
            this.$forceUpdate()
            this.loading = false;
          }
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
    },
    // 刷新
    handleRefe() {
      this.getList()
    },
    // 搜索
    search() {
      console.log(this.searchForm)
      if (this.searchForm.time) {
        const time = this.searchForm.time
        this.searchQuery.registerStartTime = time[0]
        this.searchQuery.registerEndTime = time[1]
      }
      if (this.searchForm.name) {
        // 判断是否为邮箱
        if (isEmail(this.searchForm.name)) {
          const mail = this.searchForm.name
          this.searchQuery.mail = mail
          this.searchQuery.pageNo = null
        } else {
          const phoneNo = this.searchForm.name
          this.searchQuery.phoneNo = phoneNo
          this.searchQuery.mail = null
        }
      }
      this.getList(this.searchQuery)
    },
    // 清除搜索
    clear() {
      console.log(this.pageQuery)
      this.pageQuery = {
        pageNo: 1,
        pageSize: 10}
      this.searchForm = {}
      this.searchQuery = {}
      this.getList()
    },
    // 显示基本信息
    showInfoPage(item) {
      this.isShowInfoPage = true
      this.showInfoId = item.id
      console.log(this.showInfoId)
    },

    // 关闭基本信息
    closeInfoPage() {
      this.showType = 'list'
      this.isShowInfoPage = false

    },

    // 显示详情
    // showInfo(item) {
    //   console.log(item)
    //   this.infoDialog = true
    //   this.infoDialogData = JSON.parse(JSON.stringify(item))
    // },
    //选择会员状态
    onChange(e) {
      console.log('radio checked', e.target.value)
    },
    //跳转标签管理
    openLabelCard() {
      this.showType = 'label'
      this.isShowLabel = true
    },
    // 显示详情
    handleDetail(id) {
      this.showType = 'detail'
      // debugger
      // return
      this.showInfoId = id
    },
    //设置代理
    setAuth(data) {
      this.agentsForm = {
        id: data.id,
        type: data.type,
        phone: data.phoneNo,
        userName: data.userName
      }
      this.visible = true
      // debugger
    },
    //设置代理
    submitAuth() {
      console.log(this.agentsForm)
      this.agentsForm.rate = this.agentsForm.rate * 0.01
      // debugger
      // return
      postAction('/userlist/userList/editAgents', this.agentsForm)
        .then(res => {
          console.log('设置代理', res)
          if (res.success) {
            this.visible = false
            this.handleRefe()
            this.$notification.success({
              message: '提示',
              description: res.message,
            });
          }else {
            this.visible = false
            this.handleRefe()
            this.$notification.success({
              message: '提示',
              description: res.message,
            });
          }
        })
        .catch(err => {
          console.log(err)
          this.cancelAuth()
        })
    },
    // 关闭提交代理弹框
    cancelAuth() {
      this.visible = false
      this.agentsForm = {}
    },
    // 编辑
    handleEdit() {}
  }
}
</script>
<style scoped>
@import '~@assets/less/common.less';
.mobile .d-flex {
    display: -ms-flexbox;
    display: block;
}

.mobile .float-search-btn {
    position: inherit;
    margin-top: 10px;
}

.mobile .float-search-btn {
    position: inherit;
    margin-top: 10px;
}

::v-deep .ant-modal-content .ant-modal-header {
  border-bottom: none !important;
}

::v-deep .ant-modal-content .ant-modal-title {
  font-weight: bold;
}

::v-deep .ant-modal-content {
  padding: 12px;
}
::v-deep .ant-modal-close {
  top: 8px;
}

::v-deep .ant-modal-content .ant-modal-body {
  padding-top: 0;
}
::v-deep .ant-modal-content .ant-modal-footer {
  border-top: none !important;
}

.info-box > div {
  margin: 20px auto;
}

.info-box-left {
  min-width: 100px;
}

.info-box-left span {
  color: red;
}

.mobile .d-flex {
    display: -ms-flexbox;
    display: block;
}

.mobile .float-search-btn {
    position: inherit;
    margin-top: 10px;
}
</style>
