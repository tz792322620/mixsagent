<template>
  <div class="pa-6">
    <div class="card pa-6">
      <div class="title-top">
        <div class="font-size-30 font-bold">账变明细</div>
        <div class="btn" @click="handleRefe"><a-icon type="redo" />刷新</div>
      </div>

      <div class="font-size-18 primary-color d-flex py-3 mt-6" style="border-bottom: 1px solid #eee">
        <div class="primary-border-bottom-color py-2 px-4">佣金钱包</div>
      </div>
      <a-form :form="searchForm" :label-col="{ span: 8 }" :wrapper-col="{ span: 15 }">
        <div class="d-flex mt-6">
          <div class="d-flex mr-9">
            <div class="d-flex align-center">
              <a-form-item label="订单号">
                <a-input placeholder="请输入订单号" v-model="searchForm.id" style="width: 100%;"></a-input>
              </a-form-item>
            </div>
            <div class="d-flex align-center">
              <a-form-item label="订单hash">
                <a-input placeholder="请输入订单hash" v-model="searchForm.hash" clear style="width: 100%;"></a-input>
              </a-form-item>
            </div>
            <div class="d-flex align-center">
              <a-form-item label="账变时间">
                <a-range-picker v-model="searchForm.date" format="YYYY-MM-DD" valueFormat="YYYY-MM-DD" style="width: 100%;"></a-range-picker>
              </a-form-item>
            </div>
          </div>
          <div class="ml-6">
            <a-button class="mr-6 search-btn-circle" type="primary" @click="search">筛选</a-button>
            <a-button class="clear-btn-circle" @click="clear">重置</a-button>
          </div>
        </div>
      </a-form>
      <a-table  :columns="columns" :data-source="dataSource" :loading="loading"   :pagination="ipagination"
                @change="handleTableChange" class="mt-8" bordered>
        <template  slot="type" slot-scope="text">
          <span  v-if="text == 0">充值</span>
          <span  v-if="text == 1">提现</span>
          <span  v-if="text == 2">转账(进帐)</span>
          <span  v-if="text == 3">转账(出账)</span>
          <span  v-if="text == 4">提现驳回</span>
        </template>
        <span slot="action" slot-scope="text, record">
          <a-button class="mr-4">编辑</a-button>
          <a-button>删除</a-button>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import { httpAction, getAction } from '@/api/manage'
const columns = [
  {
    title: '订单号',
    dataIndex: 'id',
    key: 'id',
    ellipsis: true
  },
  {
    title: '账变类型',
    dataIndex: 'type',
    key: 'type',

    scopedSlots: { customRender: 'type' }
  },
  {
    title: '交易金额',
    dataIndex: 'amount',
    key: 'amount',
    ellipsis: true
  },
  {
    title: '交易前余额',
    dataIndex: 'beforeBalance',
    key: 'beforeBalance',
    ellipsis: true
  },
  {
    title: '交易前冻结',
    dataIndex: 'beforeFreeze',
    key: 'beforeFreeze',
    ellipsis: true
  },
  {
    title: '交易后余额',
    dataIndex: 'afterBalance',
    key: 'afterBalance',
    ellipsis: true
  },
  {
    title: '交易后冻结',
    dataIndex: 'afterFreeze',
    key: 'afterFreeze',
    ellipsis: true
  },
  {
    title: '手续费',
    dataIndex: 'commissionCharge',
    key: 'commissionCharge',
    ellipsis: true
  },
  {
    title: '订单hash',
    dataIndex: 'hash',
    key: 'hash'
  },
  {
    title: '备注',
    dataIndex: 'recordName',
    key: 'recordName'
  },
  {
    title: '账变时间',
    dataIndex: 'createTime',
    key: 'createTime'
  }
]

export default {
  name: 'IndexChart',
  components: {},
  data() {
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
      dataSource: [],
      columns,
      pageQuery: {
        pageNo: 1,
        pageSize: 10
      },
      loading: false,
      searchForm: {}
    }
  },
  created() {
    this.getList(this.pageQuery)
  },
  methods: {
    handleTableChange(pagination, filters, sorter){
      //TODO 筛选
      if (Object.keys(sorter).length>0){
        this.isorter.column = sorter.field;
        this.isorter.order = "ascend"==sorter.order?"asc":"desc"
      }
      this.ipagination = pagination;
      this.loadData();
    },
    handleChange(item) {
      console.log(item)
    },
    // 查询列表数据
    getList(pageQuery,searchQuery) {
      this.loading = true
      // debugger
      getAction('/agentmoneyrecord/agentMoneyrecord/list', Object.assign(pageQuery, searchQuery))
        .then(res => {
          // console.log(res);
          if (res.success) {
            const data = res.result.records
            this.dataSource = data
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
      this.getList(this.pageQuery)
    },
    // 搜索
    search() {
      let searchQuery = {}
      if (this.searchForm.date) {
        const time = this.searchForm.date
        searchQuery.registerStartTime = time[0]
        searchQuery.registerEndTime = time[1]
      }
      if (this.searchForm.id) {
        searchQuery.id = this.searchForm.id
      }
      if (this.searchForm.hash) {
        searchQuery.hash = this.searchForm.hash
      }
      this.getList(this.pageQuery,searchQuery)
    },
    // 清除搜索
    clear() {
      this.pageQuery={
        pageNo: 1,
          pageSize: 10
      }
      this.searchForm = {}
      this.getList(this.pageQuery)
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  background-color: white;
  border-radius: 10px;
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
</style>

<style scoped></style>
