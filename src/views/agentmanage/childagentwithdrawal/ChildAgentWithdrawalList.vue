<template>
  <div class="pa-6">
    <div class="card pa-6" v-if="!isShowRecordList">
      <!-- 头部标题 -->
      <div class="title-top">
        <div class="font-size-30 font-bold">下级代理提币申请</div>
        <div class="btn" @click="handleRefe"><a-icon type="redo" />刷新</div>
      </div>

      <!-- 查询区域 -->
      <div class="d-flex mt-6">
        <a-form :form="searchForm" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }">
          <a-form-item label="代理商账号">
            <a-input placeholder="请输入代理商账号搜索" v-model="searchForm.agentId" style="width: 220px"></a-input>
          </a-form-item>
        </a-form>
        <div class="px-6"></div>
        <div class="float-search-btn">
          <a-button class="mr-6 search-btn-circle" type="primary" @click="search">筛选</a-button>
          <a-button class="clear-btn-circle" @click="clear">重置</a-button>
        </div>
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

          :columns="columns" :data-source="dataSource" :loading="loading" class="j-table-force-nowrap">
          <template slot="status" slot-scope="text, record">
            <span v-html="statusFormat(record.status)"></span>
          </template>
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="action" slot-scope="text, record">
            <a class="table-handle-btn" style="background: #2ebd85" @click="editOk(record.id)">通过</a>
            <a class="table-handle-btn" style="background: #f44d62" @click="editNo(record.id)">拒绝</a>
            <a-dropdown>
              <a class="ant-dropdown-link table-handle-btn">更多 <a-icon type="down"/></a>
              <a-menu slot="overlay">
                <a-menu-item>
                  <a @click="getRecord(record.agentId)">提币记录</a>
                </a-menu-item>
                <a-menu-item>
                  <a @click="handleDetali(record)">查看详情</a>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
        </a-table>
      </div>
      <!-- 查看详情 -->
      <a-modal v-model="detailModel" title="查看详情" centered @ok="() => (detailModel = false)" :footer="null">
        <a-form :form="detailsForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
          <a-form-item label="真实姓名:" v-if="detailsForm.name">
            <a-input
              placeholder="请输入真实姓名"
              class="detail-input-border"
              v-model="detailsForm.name"
              default-value="26888888"
              :disabled="true"
            />
          </a-form-item>
          <a-form-item label="手机:" v-if="detailsForm.phone">
            <a-input
              placeholder="请输入手机"
              class="detail-input-border"
              v-model="detailsForm.phone"
              :disabled="true"
            />
          </a-form-item>
          <a-form-item label="邮箱:">
            <a-input
              placeholder="请输入邮箱"
              class="detail-input-border"
              v-model="detailsForm.email"
              default-value="26888888"
              :disabled="true"
            />
          </a-form-item>
          <a-form-item label="创建时间:" v-if="detailsForm.createTime">
            <a-input
              placeholder="请输入创建时间"
              class="detail-input-border"
              default-value="26888888"
              v-model="detailsForm.createTime"
              :disabled="true"
            />
          </a-form-item>
          <a-form-item label="代理编号:" v-if="detailsForm.agentId">
            <a-input
              placeholder="请输入上级编号"
              class="detail-input-border"
              default-value="26888888"
              v-model="detailsForm.agentId"
              :disabled="true"
            />
          </a-form-item>
          <a-form-item label="代理等级:" v-if="detailsForm.type">
            <a-input
              placeholder="请输入上级等级"
              class="detail-input-border"
              default-value="26888888"
              v-model="detailsForm.type"
              :disabled="true"
            />
          </a-form-item>
          <a-form-item label="提现金额:" v-if="detailsForm.amount">
            <a-input
              placeholder="请输入提现金额"
              class="detail-input-border"
              default-value="26888888"
              v-model="detailsForm.amount"
              :disabled="true"
            />
          </a-form-item>
          <a-form-item label="上级编号:" v-if="detailsForm.parentId">
            <a-input
              placeholder="请输入上级编号"
              class="detail-input-border"
              default-value="26888888"
              v-model="detailsForm.parentId"
              :disabled="true"
            />
          </a-form-item>
          <a-form-item label="提币地址:" v-if="detailsForm.virtualAddress">
            <a-input
              placeholder="请输入提币地址"
              class="detail-input-border"
              default-value="26888888"
              v-model="detailsForm.virtualAddress"
              :disabled="true"
            />
          </a-form-item>
        </a-form>
      </a-modal>

      <!-- 拒绝理由 -->
      <a-modal
        v-model="refuseModel"
        title="拒绝理由(非选择)"
        centered
        @ok="() => (refuseModel = false)"
        :footer="null"
        width="500px"
      >
        <a-form :form="refuseForm" :wrapper-col="{ span: 24 }">
          <a-form-item>
            <a-input type="textarea" v-model="refuseForm.reason" style="width: 100%;" placeholder="请填写拒绝理由" />
          </a-form-item>
        </a-form>
        <div class="d-flex justify-space-around">
          <a-button class="canc-btn" @click="cancelRefuse">取消</a-button>
          <a-button class="sub-btn" @click="submitRefuse">确定</a-button>
        </div>
      </a-modal>
      <!-- <child-agent-withdrawal-modal ref="modalForm" @ok="modalFormOk"></child-agent-withdrawal-modal> -->
    </div>
    <!-- 提币记录 -->
    <RecordList :isShowRecordList.sync="isShowRecordList" :id="recordId"></RecordList>
  </div>
</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ChildAgentWithdrawalModal from './modules/ChildAgentWithdrawalModal'
import { httpAction, getAction } from '@/api/manage'
import { validateDuplicateValue } from '@/utils/util'
import RecordList from './modules/RecordList'
import Template1 from '../../jeecg/JVxeDemo/layout-demo/Template1.vue'
import {postAction, postActions} from '../../../api/manage'
export default {
  name: 'ChildAgentWithdrawalList',
  mixins: [JeecgListMixin, mixinDevice],
  components: {
    ChildAgentWithdrawalModal
  },
  data() {
    return {
      description: '下级代理提币申请管理页面',
      // 表头
      columns: [
        {
          title: '代理商编号',
          align: 'center',
          dataIndex: 'agentId'
        },
        {
          title: '提现金额',
          align: 'center',
          dataIndex: 'amount'
        },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'createTime'
        },
        {
          title: '提现地址',
          align: 'center',
          dataIndex: 'virtualAddress'
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'status',
          key: 'status',
          scopedSlots: { customRender: 'status' }
        },
        // {
        //   title:'二级代理',
        //   align:"center",
        //   dataIndex: 'parentsId'
        // },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          fixed: 'right',
          width: 147,
          scopedSlots: { customRender: 'action' }
        }
      ],
      dataSource: [],
      url: {
        list: '/childagentwithdrawal/childAgentWithdrawal/list',
        delete: '/childagentwithdrawal/childAgentWithdrawal/delete',
        deleteBatch: '/childagentwithdrawal/childAgentWithdrawal/deleteBatch',
        exportXlsUrl: '/childagentwithdrawal/childAgentWithdrawal/exportXls',
        importExcelUrl: 'childagentwithdrawal/childAgentWithdrawal/importExcel',
        Ok: '/childagentwithdrawal/childAgentWithdrawal/editOk',
        No: '/childagentwithdrawal/childAgentWithdrawal/editNo'
      },
      dictOptions: {},
      superFieldList: [],
      addModel: false,
      modelTitle: '编辑信息',
      detailModel: false,
      refuseModel: false,
      isShowRecordList: false,
      recordId: '',
      pageQuery: {
        pageNo: 1,
        pageSize: 10
      },
      searchForm: {},
      loading: false,
      detailsForm: {},
      statusData: [
        { label: '审核中', value: 0 },
        { label: '二级审核通过', value: 1 },
        { label: '一级审核通过', value: 2 },
        { label: '二级审核拒绝', value: 3 },
        { label: '一级审核拒绝', value: 4 },
        { label: '打币中', value: 5 },
        { label: '已到账', value: 6 },
        { label: '拒绝', value: 7 }
      ],
      agentId: null,
      refuseForm: {}
    }
  },
  components: {
    RecordList
  },
  create() {
    // this.getSuperFieldList()
    this.getList()
  },
  computed: {
    importExcelUrl: function() {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    }
  },
  methods: {
    initDictConfig() {},

    Ok(record) {
      let httpurl = this.url.Ok
      let method = 'put'
      postActions(httpurl, record, method)
        .then(res => {
          if (res.success) {
            that.$message.success(res.message)
            that.$emit('ok')
          } else {
            that.$message.warning(res.message)
          }
        })
        .finally(() => {
          that.$message.success(res.message)
        })
    },
    No(record) {
      let httpurl = this.url.No
      let method = 'put'
      postActions(httpurl, record, method)
        .then(res => {
          if (res.success) {
            that.$message.success(res.message)
            that.$emit('ok')
          } else {
            that.$message.warning(res.message)
          }
        })
        .finally(() => {
          that.$message.success(res.message)
        })
    },
    getSuperFieldList() {
      let fieldList = []
      fieldList.push({ type: 'string', value: 'agentId', text: '代理商编号' })
      fieldList.push({ type: 'number', value: 'amount', text: '提现金额' })
      fieldList.push({ type: 'string', value: 'parentId', text: '一级上级编号' })
      fieldList.push({ type: 'string', value: 'virtualAddress', text: '提现地址' })
      fieldList.push({ type: 'int', value: 'status', text: '状态' })
      fieldList.push({ type: 'string', value: 'parentsId', text: '二级上级编号' })
      this.superFieldList = fieldList
    },
    // 编辑
    handleEdit() {
      this.addModel = true
      this.modelTitle = '编辑信息'
    },
    handleDetali(data) {
      this.detailModel = true
      this.detailsForm = data
    },
    // 拒绝
    handleDel() {
      this.$confirm({
        title: '提示',
        content: '确认删除提币申请？',
        okText: '确认',
        cancelText: '取消',
        centered: 'true'
      })
    },
    getList(searchQuery) {
      this.loading = true
      // debugger
      getAction('/childagentwithdrawal/childAgentWithdrawal/list', Object.assign(this.pageQuery, searchQuery))
        .then(res => {
          // console.log(res);
          if (res.success) {
            const data = res.result.records
            this.dataSource = data
            this.$forceUpdate()
            this.loading = false
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
      this.getList(this.searchForm)
    },
    // 清除搜索
    clear() {
      this.searchForm = {}
      this.getList()
    },
    //提币记录
    getRecord(id) {
      this.recordId = id
      // debugger
      this.isShowRecordList = true
    },
    //表格状态数据回显
    statusFormat(status) {
      if (status) {
        const label = this.statusData.map(item => {
          if (item.value == status) {
            console.log(item.label)
            return item.label
          }
        })
        if (label == null || label == undefined) {
          return '未知'
        }
      } else {
        return '未知'
      }
    },
    //通过申请
    editOk(id) {
      let that = this
      this.$confirm({
        title: '提示',
        content: '是否确定通过申请？',
        okText: '确定',
        okType: 'success',
        cancelText: '取消',
        onOk() {
          let form = {
            id: id
          }
          postActions('/childagentwithdrawal/childAgentWithdrawal/editOk', form)
            .then(res => {
              console.log(res)
              if (res.success) {
                that.$message.success('操作成功', 10)
                that.getList()
              }
            })
            .catch(err => {
              console.log(err)
            })
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },
    editNo(id) {
      this.refuseModel = true
      this.refuseForm = {
        id: id
      }
    },
    //拒绝申请
    submitRefuse() {
      postActions('/childagentwithdrawal/childAgentWithdrawal/editNo', this.refuseForm)
        .then(res => {
          if (res.success) {
            this.refuseModel = false
            this.$message.success('操作成功', 10)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 取消拒绝申请
    cancelRefuse() {
      this.refuseModel = false
    }
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
</style>
