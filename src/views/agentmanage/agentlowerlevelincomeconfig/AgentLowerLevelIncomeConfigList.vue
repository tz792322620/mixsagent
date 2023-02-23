<!-- 代理商收益配置 -->
<template>
<div class="pa-6">
  <div class="card pa-6">
    <!-- 头部标题 -->
    <div class="title-top">
        <div class="font-size-30 font-bold">代理商收益配置</div>
        <div class="btn" @click="handleRefe"><a-icon type="redo" />刷新</div>
    </div>

    <!-- 查询区域 -->

    <div style="margin-bottom: 30px">
      <a-form :form="searchForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 8 }">

        <div class="d-flex mt-6">
          <div class="d-flex">
            <div class="d-flex align-center">
              <a-form-item label="代理商编号">
                <a-input placeholder="代理商编号" v-model="searchForm.agentId" style="width: 220px"></a-input>
              </a-form-item>
            </div>
          </div>
          <div class="px-6"></div>
          <div class="d-flex align-center">
            <!-- <div class="min-width-80px">注册时间:</div> -->
            <a-form-item label="平台类型：">
              <a-select
                placeholder="平台类型"
                v-model="searchForm.platformType" style="width: 220px">
                <a-select-option value="0">
                  币币
                </a-select-option>
                <a-select-option value="1">
                  合约
                </a-select-option>
                <a-select-option value="2">
                  法币
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>

          <div class="px-6"></div>
          <div class="d-flex align-center">
            <!-- <div class="min-width-80px">注册时间:</div> -->
            <a-form-item label="交易类型：">
              <a-select
                placeholder="交易类型"
                v-model="searchForm.tradeType" style="width: 220px">
                <a-select-option value="0">
                  开仓手续费
                </a-select-option>
                <a-select-option value="1">
                  平仓盈亏
                </a-select-option>
                <a-select-option value="2">
                  平仓手续费
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>

        </div>
        <div class="d-flex">
          <div class="d-flex align-center">
            <!-- <div class="min-width-80px">注册时间:</div> -->
            <a-form-item label="佣金：">
              <a-select
                placeholder="佣金"
                v-model="searchForm.type" style="width: 220px">
                <a-select-option value="0">
                  手续费
                </a-select-option>
                <a-select-option value="1">
                  盈亏
                </a-select-option>
                <a-select-option value="2">
                  手续费+盈亏
                </a-select-option>
              </a-select>
            </a-form-item>
          </div>
          <div class="px-6"></div>
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

      <!-- 启用 -->
      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="ipagination"
        @change="handleTableChange"
        class="j-table-force-nowrap"
        bordered
      >
      <template slot="platformType" slot-scope="platformType">
          <div :key="platformType">
            <span v-if="platformType == 0">币币</span>
            <span v-if="platformType == 1">合约</span>
            <span v-if="platformType == 2">法币</span>
          </div>
        </template>

        <template slot="tradeType" slot-scope="tradeType">
          <div :key="tradeType">
            <span v-if="tradeType == 0">D(工作日+节假日)</span>
            <span v-if="tradeType == 1">T(工作日)</span>
          </div>
        </template>


        <template slot="settlementCycle" slot-scope="settlementCycle">
          <div :key="settlementCycle">
            <span v-if="settlementCycle == 0">日结</span>
            <span v-if="settlementCycle == 1">周结</span>
            <span v-if="settlementCycle == 2">月结</span>
          </div>
        </template>

        <template slot="isOpen" slot-scope="isOpen">
          <div :key="isOpen">
            <span v-if="isOpen == 0">否</span>
            <span v-if="isOpen == 1">是</span>
          </div>
        </template>

        <template slot="type" slot-scope="type">
          <div :key="type">
            <span v-if="type == 0">手续费</span>
            <span v-if="type == 1">盈亏</span>
            <span v-if="type == 2">手续费+盈亏</span>
          </div>
        </template>
      <span slot="action" slot-scope="text, record">
        <a class="table-handle-btn" @click="handleEdit(record)">编辑</a>
        <!-- <a-divider type="vertical" /> -->
        <a class="table-handle-btn" @click="handleDetail(record)">详情</a>

        </span>
      </a-table>
    </div>


    <!-- 新增弹窗 -->
    <a-modal v-model="addModel" :title="modelTitle" centered @ok="() => (addModel = false)" :footer="null">
      <a-form :form="addForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">

        <a-form-item label="结算周期类型:" style="display: flex;">
          <a-select
            placeholder="请选择结算周期类型"
            style="width: 40%;"
            v-model:value="addForm.tradeType"
          >
            <a-select-option value="0">D(工作日+节假日)</a-select-option>
            <a-select-option value="1">T(工作日)</a-select-option>
<!--            <a-select-option value="2">W(周)</a-select-option>-->
<!--            <a-select-option value="3">M(月)</a-select-option>-->
          </a-select>
        </a-form-item>
        <a-form-item label="结算时间:">
          <a-select
            placeholder="请选择结算时间"
            style="width: 40%;"
            v-model:value="addForm.settlementCycle"
          >
          <a-select-option value="0" >日结</a-select-option>
          <a-select-option value="1" >周结</a-select-option>
          <a-select-option value="2" >月结</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="是否开启收益:" style="display: flex;">
          <a-select style="width: 40%;"    v-model:value="addForm.isOpen" placeholder="请选择是否开启收益">
            <a-select-option value="0">否</a-select-option>
            <a-select-option value="1">是</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="费率:">
          <a-input
            suffix="%"
            placeholder="费率"
            v-model:value="addForm.rate"
          />
        </a-form-item>

        <a-form-item label="佣金:">
          <a-select   v-model:value="addForm.type" placeholder="请选择是否开启收益">
            <a-select-option value="0">手续费</a-select-option>
            <a-select-option value="1">盈亏</a-select-option>
            <a-select-option value="2">手续费+盈亏</a-select-option>
          </a-select>

        </a-form-item>
      </a-form>
      <div class="d-flex justify-space-around">
        <a-button class="canc-btn" @click="cancelAuth">取消</a-button>
        <a-button class="sub-btn" @click="submitAuth">确定</a-button>
      </div>
    </a-modal>
    <!-- 详情弹窗 -->
    <a-modal v-model="detailModel" title="详情" centered @ok="() => (detailModel = false)" :footer="null">
      <a-form :form="detailsForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-form-item label="平台类型:">
          <span v-if="detailsForm.platformType == 0">币币</span>
          <span v-if="detailsForm.platformType == 1">合约</span>
          <span v-if="detailsForm.platformType == 2">法币</span>
        </a-form-item>
        <a-form-item label="结算周期类型:">
          <span style="width: 50%;" v-if="detailsForm.tradeType == 0">D(工作日+节假日)</span>
          <span style="width: 50%;" v-if="detailsForm.tradeType == 1">T(工作日)</span>
<!--          <span style="width: 50%;" v-if="detailsForm.tradeType == 2">W(周)</span>-->
<!--          <span style="width: 50%;" v-if="detailsForm.tradeType == 3">M(月)</span>-->
<!--          <a-input class="detail-input-border" v-model="detailsForm.tradeType" default-value="" :disabled="true" />-->
        </a-form-item>

        <a-form-item label="结算时间:">
          <span style="width: 50%;" v-if="detailsForm.settlementCycle == 0">日结</span>
          <span style="width: 50%;" v-if="detailsForm.settlementCycle == 1">周结</span>
          <span style="width: 50%;" v-if="detailsForm.settlementCycle == 2">月结</span>
<!--          <span >{{detailsForm.settlementCycle}}</span>-->
<!--          <a-input class="detail-input-border" v-model="detailsForm.settlementCycle" default-value="0" :disabled="true" />-->
        </a-form-item>
        <a-form-item label="是否开启收益:">
          <span style="width: 50%;" v-if="detailsForm.isOpen == 0">否</span>
          <span style="width: 50%;" v-if="detailsForm.isOpen == 1">是</span>
<!--          <a-input class="detail-input-border" v-model="detailsForm.isOpen" default-value="是" :disabled="true" />-->
        </a-form-item>
        <a-form-item label="费率:">
          <span >{{detailsForm.rate}}</span>
<!--          <a-input class="detail-input-border" v-model="detailsForm.rate" default-value="135451226888888" :disabled="true" />-->
        </a-form-item>
<!--        <a-form-item label="代理商备注:">-->
<!--          <a-input class="detail-input-border" default-value="" :disabled="true" />-->
<!--        </a-form-item>-->
        <a-form-item label="佣金:">
          <span v-if="detailsForm.type == 0">手续费</span>
          <span v-if="detailsForm.type == 1">盈亏</span>
          <span v-if="detailsForm.type == 2">手续费+盈亏</span>
<!--          <a-input class="detail-input-border" v-model="detailsForm.type" default-value="打包" :disabled="true" />-->
        </a-form-item>
      </a-form>
    </a-modal>

  </div>
</div>

</template>

<script>
import '@/assets/less/TableExpand.less'
import { mixinDevice } from '@/utils/mixin'
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import AgentLowerLevelIncomeConfigModal from './modules/AgentLowerLevelIncomeConfigModal'
import { httpAction, getAction } from '@/api/manage'
import {postAction} from "../../../api/manage";
export default {
  name: 'AgentLowerLevelIncomeConfigList',
  mixins: [JeecgListMixin, mixinDevice],
  components: {
    AgentLowerLevelIncomeConfigModal,
  },
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
      description: '代理商收益配置管理页面',
      modelTitle: '新增',
      // 表头
      columns: [
        {
          title: '代理商编号',
          align: 'center',
          dataIndex: 'agentId',
        },
        {
          title: '结算周期',
          align: 'center',
          dataIndex: 'settlementCycle',
          scopedSlots: { customRender: 'settlementCycle' },
        },
        {
          title: '结算周期类型',
          align: 'center',
          dataIndex: 'tradeType',
          key: 'tradeType',
          scopedSlots: { customRender: 'tradeType' },
        },
        // {
        //   title: '币种编号',
        //   align: 'center',
        //   dataIndex: 'virtualCoinId',
        // },
        {
          title: '费率',
          align: 'center',
          dataIndex: 'rate',
        },

        {
          title: '是否开启该项收益',
          align: 'center',
          dataIndex: 'isOpen',
          key: 'isOpen',
          scopedSlots: { customRender: 'isOpen' },
        },

        {
          title: '佣金',
          align: 'center',
          dataIndex: 'type',
          key: 'type',
          scopedSlots: { customRender: 'type' },
        },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'createTime',
          key: 'createTime',
          scopedSlots: { customRender: 'createTime' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',
          fixed: 'right',
          width: 147,
          scopedSlots: { customRender: 'action' },
        },
      ],
      dataSource: [],
      url: {
        list: '/agentincomeconfig/agentIncomeConfig/list',
        delete: '/agentincomeconfig/agentIncomeConfig/delete',
        deleteBatch: '/agentincomeconfig/agentIncomeConfig/deleteBatch',
        exportXlsUrl: '/agentincomeconfig/agentIncomeConfig/exportXls',
        importExcelUrl: 'agentincomeconfig/agentIncomeConfig/importExcel',
      },
      dictOptions: {},
      superFieldList: [],
      addModel: false,
      detailModel: false,
      pageQuery: {
        pageNo: 1,
        pageSize: 10
      },
      searchForm: {},
      // searchQuery: {},
      loading: false,
      detailsForm: {},
      addForm: {},
    }
  },
  created() {
    // this.getSuperFieldList();
    // console.log('数据', this.dataSource)
    this.getList();
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
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
    initDictConfig() {},
    getSuperFieldList() {
      let fieldList = []
      fieldList.push({ type: 'int', value: 'platformType', text: '平台类型' })
      fieldList.push({ type: 'int', value: 'tradeType', text: '交易类型' })
      fieldList.push({ type: 'int', value: 'virtualCoinId', text: '币种编号' })
      fieldList.push({ type: 'string', value: 'rate', text: '费率' })
      fieldList.push({ type: 'int', value: 'settlementCycle', text: '结算周期' })
      fieldList.push({ type: 'int', value: 'isOpen', text: '是否开启该项收益' })
      fieldList.push({ type: 'int', value: 'agentId', text: '代理商编号' })
      fieldList.push({ type: 'int', value: 'type', text: '手续费' })
      this.superFieldList = fieldList
    },
    handleAdd() {
      this.modelTitle = '新增'
      this.addModel = true
    },
    //编辑
    handleEdit(record) {
      this.addForm = {
        id: record.id,
        agentId: record.agentId,
      }
      this.modelTitle = '编辑'
      this.addModel = true
    },
    // 详情
    handleDetail(data) {
      this.detailModel = true;
      //清除上一次数据
      this.detailsForm = {};
      this.detailsForm = data;
    },
    // 查询列表数据
    getList(searchQuery) {
      // console.log(searchQuery)
      this.loading = true;
      // debugger
      getAction('/agentincomeconfig/agentIncomeConfig/list',Object.assign(this.pageQuery,searchQuery)).then(res =>{
        // console.log(res);
        if(res.success){
          const data = res.result.records;
          this.dataSource = data;
          this.$forceUpdate();
          this.loading = false;
        }
      }).catch((err) => {
        console.log(err);
        this.loading = false;
      });
    },
    //提交代理商配置
    submitAuth() {
      console.log(this.addForm)
      this.addForm.rate = this.addForm.rate * 0.01
      // debugger
      // return
      postAction('/agentincomeconfig/agentIncomeConfig/edit', this.addForm)
        .then(res => {
          console.log('设置修改代理商配置', res)
          if (res.success) {
            this.$notification.success({
              message: '提示',
              description: res.message,
            });
            this.cancelAuth()
            this.handleRefe()
          }
        })
        .catch(err => {
          console.log(err)
          this.cancelAuth()
        })
    },
    // 关闭代理商配置弹框
    cancelAuth() {
      this.addModel = false
      this.addForm = {}
    },
    // 刷新
    handleRefe() {
      this.getList();
    },
    // 搜索
    search(){
      this.getList(this.searchForm);
    },
    // 清除搜索
    clear() {
      console.log(this.pageQuery)
      this.searchForm = {};
      this.searchQuery = {}
      this.pageQuery = {
        pageNo: 1,
        pageSize: 10}
      // console.log(this.searchForm)
      this.getList();
    },
  },
}
</script>
<style scoped lang='less'>
@import '~@assets/less/common.less';
.mobile .d-flex {
    display: -ms-flexbox;
    display: block;
}

.mobile .float-search-btn {
    position: inherit;
    margin-top: 10px;
}

// 弹出层底部按钮样式
.canc-btn {
  //取消按钮
  width: 170px;
  height: 40px;
  border-radius: 3px;
  border: 1px solid #49b1b3;
  color: #49b1b3;
  font-size: 16px;
}
.sub-btn {
  //确认按钮
  width: 170px;
  height: 40px;
  background: #49b1b3;
  border-radius: 3px;
  color: #fff;
  font-size: 16px;
}
.detail-input-border.ant-input {
  border: 1px solid #49b1b3;
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