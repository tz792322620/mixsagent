<template>
  <div class="pa-6">
    <div class="card pa-6">
        <div class="title-top">
        <div class="font-size-30 font-bold">开仓记录</div>
        <div class="btn" @click="handleRefe"><a-icon type="redo" />刷新</div>
    </div>

      <div style="margin-bottom: 30px">
        <a-form :form="searchForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 8 }">

          <div class="d-flex mt-6">
            <div class="d-flex">
              <div class="d-flex align-center">
                <a-form-item label="下级账号:">
                  <a-input placeholder="下级账号" v-model="searchForm.phoneNo" style="width: 220px"></a-input>
                </a-form-item>
              </div>
            </div>
<!--            <div class="px-6"></div>-->

<!--            <div class="d-flex">-->
<!--              <div class="d-flex align-center">-->
<!--                <a-form-item label="逐仓/全仓:">-->
<!--                  <a-select-->
<!--                    placeholder="全部"-->
<!--                    v-model="searchForm.depotType" style="width: 220px">-->
<!--                    <a-select-option value="0">-->
<!--                      逐仓-->
<!--                    </a-select-option>-->
<!--                    <a-select-option value="1">-->
<!--                      全仓-->
<!--                    </a-select-option>-->

<!--                  </a-select>-->
<!--                </a-form-item>-->
<!--              </div>-->
<!--            </div>-->
            <div class="px-6"></div>
            <div class="d-flex">
              <div class="d-flex align-center">
                <a-form-item label="永续/超级:">
                  <a-select
                    placeholder="全部"
                    v-model="searchForm.level" style="width: 220px">
                    <a-select-option value="1">
                      永续
                    </a-select-option>
                    <a-select-option value="2">
                      超级
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </div>
            </div>

          </div>
          <div class="d-flex">
            <div class="d-flex align-center">
              <!-- <div class="min-width-80px">注册时间:</div> -->
              <a-form-item label="合约品种:">
                <a-select
                  placeholder="全部"
                  v-model="searchForm.contractNo" style="width: 220px">
                  <a-select-option v-for="(item, index) in bidui" :value="item.contract_no" :key="index">
                    {{ item.display_name }}
                  </a-select-option>

                </a-select>
              </a-form-item>
            </div>
            <!--            <div class="px-6"></div>-->
            <!--            <div class="px-6"></div>-->

            <div class=" d-flex align-center">
              <a-form-item label="成交时间">
<!--                <a-range-picker-->
<!--                  v-model="searchForm.createdDate"-->
<!--                />-->
                <a-range-picker @change="onChange"  format="YYYY-MM-DD HH:mm:ss" v-model="timeEl"/>
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

      <a-table
        :columns="columns"
        :data-source="dataSource"
        :pagination="ipagination"
        @change="handleTableChange"
        class="j-table-force-nowrap"
        bordered
      >
        <template  slot="userId" slot-scope="text">
          <span style="color:green" v-if="text">全仓</span>
        </template>
        <template  slot="direction" slot-scope="text">
          <span style="color:green" v-if="text == 'BULL'">买涨</span>
          <span style="color:red" v-if="text == 'BEAR'">买跌</span>
        </template>
        <template  slot="orderStatus" slot-scope="text">
          <span style="color:green" v-if="text == 'CANCEL'">已撤销</span>
          <span style="color:red" v-if="text == 'DEALED'">已成交</span>
          <span style="color:red" v-if="text == 'WAIT'">已委托</span>
        </template>

      <span slot="action" slot-scope="text, record">
          <a @click="handleEdit">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleDetail">查看详情</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="handleDel">删除</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>

    </div>
    <!-- 详情弹框 -->
    <a-modal v-model="visible" title="订单详情" centered :footer="null" @ok="handleOk">
      <!-- 详情数据 -->
      <ul class="des-list">
        <li class="des-item">
          <span class="des-item-title">订单编号</span>
          <span class="des-item-data">5724179565769986048</span>
        </li>
        <li class="des-item">
          <span class="des-item-title">交易时间</span>
          <span class="des-item-data">2022-05-11  19:00：35</span>
        </li>
        <li class="des-item">
          <span class="des-item-title">类型</span>
          <span class="des-item-data"></span>
        </li>
        <li class="des-item">
          <span class="des-item-title">盘口</span>
          <span class="des-item-data">大3@1.72</span>
        </li>
        <li class="des-item">
          <span class="des-item-title">流水(RMB)</span>
          <span class="des-item-data">72.00</span>
        </li>
        <li class="des-item">
          <span class="des-item-title">输/赢(RMB)：</span>
          <span class="des-item-data">72.00</span>
        </li>
        <li class="des-item">
          <span class="des-item-title">订单状态：</span>
          <span class="des-item-data">已结算</span>
        </li>
        <li class="des-item">
          <span class="des-item-title">投注时间：</span>
          <span class="des-item-data">2022-05-11  19:00：35</span>
        </li>
        <li class="des-item">
          <span class="des-item-title">投注完成时间：</span>
          <span class="des-item-data">2022-05-11  19:00：35</span>
        </li>
      </ul>
    </a-modal>

  </div>
</template>

<script>
import {getPositionRecord} from "@/api/agentUser"
import Template1 from '../../jeecg/JVxeDemo/layout-demo/Template1.vue';
import { getAction } from '@/api/manage'
//表头
const columns = [
  {
    title: '委托订单号',
    dataIndex: 'orderSn',
    key: 'orderSn',
    // width: 100,
  },
  {
    title: '下级账号',
    dataIndex: 'phoneNo',
    key: 'phoneNo',
    // width: 100,
  },
  {
    title: '下级姓名',
    dataIndex: 'name',
    key: 'name',
    // width: 100,
  },
  {
    align: 'center',
    title: '类型',
    dataIndex: 'userId',
    key: 'userId',
    scopedSlots: { customRender: 'userId' },
  },
  {
    align: 'center',
    title: '合约品种',
    dataIndex: 'displayName',
    key: 'displayName',

  },
  {
    align: 'center',
    title: '方向',
    dataIndex: 'direction',
    key: 'direction',

    scopedSlots: { customRender: 'direction' },
  },
  {
    align: 'center',
    title: '合约数量',
    dataIndex: 'amount',
    key: 'amount'
  },
  // {
  //   align: 'center',
  //   title: '逐仓/全仓',
  //   dataIndex: 'depotType',
  //   key: 'depotType',
  //   scopedSlots: { customRender: 'depotType' },
  //
  // },
  {
    align: 'center',
    title: '杠杆倍数',
    dataIndex: 'lever',
    key: 'lever'
  },
  // {
  //   title: '未结算盈亏',
  //   dataIndex: '',
  //   key: ''
  // },
  // {
  //   align: 'center',
  //   title: '盈亏率',
  //   dataIndex: 'depotType',
  //   key: 'depotType',
  //
  // },
  {
    align: 'center',
    title: '保证金',
    dataIndex: 'initMargin',
    key: 'initMargin',

  },
  {
    align: 'center',
    title: '开仓手续费',
    dataIndex: 'openCommissionFee',
    key: 'openCommissionFee',
   },
  {
    align: 'center',
    title: '委托价',
    dataIndex: 'orderPrice',
    key: 'orderPrice',

  },
  // {
  //   title: '预估强平价',
  //   dataIndex: 'mail2',
  //   key: 'mail2'
  // },
  // {
  //   align: 'center',
  //   title: '购买类型',
  //   dataIndex: 'tradeType',
  //   key: 'tradeType',
  //
  // },

  {
    align: 'center',
    title: '仓位创建时间',
    dataIndex: 'createdDate',
    key: 'createdDate',

  },
  // {
  //   align: 'center',
  //   title: '委托状态',
  //   dataIndex: 'orderStatus',
  //   key: 'orderStatus',
  //   scopedSlots: { customRender: 'orderStatus' },
  //
  // },
  {
    title: '成交时间',
    dataIndex: 'createdDate',
    key: 'createdDate',

  },
//   {
//     title: '操作',
//     key: 'action',
//     scopedSlots: { customRender: 'action' },
//   },
];

const data = [
  {
    id: '1',
    levelName: 'ZX776',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
    address2: "开空",
    tags: ['nice', 'developer'],
  },
  {
    id: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park, London No. 2 Lake Park',
    tags: ['loser'],
  },
  {
    id: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
export default {
  name: "AgentOpenPositionRecord",
  components: {
    Template1
  },
  data() {
    return {
      startTime:'',
      endTime:'',
      timeEl:[],
      allowClear:false,
      bidui:[],
      searchForm:{},
      columns,
      dataSource:[],
      visible: false,
      loading: false,
      pageQuery: {
        pageNo: 1,
        pageSize: 99999
      },
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
    }
  },
  created() {
    // this.getPositionRecordList();
    this.getListbd();
    this.getList();
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
    handleChange(item){
      console.log(item)
    },
    onChange(date, dateString) {
      this.searchForm.startTime = dateString[0];
      this.searchForm.endTime = dateString[1];

      console.log(this.searchForm);
    },
    // 查询列表数据
     getListbd() {
      getAction('/business/contract/getContractBoxList')
        .then(res => {
          this.bidui = res.result
          // console.log(this.bidui)
        })
    },
        // 查询列表数据
    getList(searchQuery) {
      this.loading = true
      // debugger
      getAction('/business/userOrder/openHoldingList', Object.assign(this.pageQuery, searchQuery))
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
    // 获取记录列表
    getPositionRecordList(){
      getPositionRecord({}).then((res)=>{
        if(res.success){
          const data = res.result;
          this.dataSouce = data;
          console.log("表格数据",this.dataSouce);
        }else{
        }
      });
    },
    handleRefe() {
      this.getList()
    },
    handleOk(){
      this.visible =false
    },
    //删除提示框
    handleDel() {
      this.$confirm({
        title: '提示',
        content: '确认删除开仓记录？',
        okText: '确认',
        cancelText: '取消',
        centered: 'true'
      });
    },
    // 搜索
    search() {
      this.getList(this.searchForm)
    },
    // 清除搜索
    clear() {
      this.pageQuery={
        pageNo: 1,
        pageSize: 10
      }
      this.searchQuery = {}
      this.searchQuery = {}
      this.getList()
    },
  }
}
</script>

<style lang="less" scoped>


.card {
  background-color: white;
  border-radius: 10px;
}


</style>

<style scoped  lang="less">
@import '~@assets/less/common.less';
.mobile .d-flex {
    display: -ms-flexbox;
    display: block;
}

.mobile .float-search-btn {
    position: inherit;
    margin-top: 10px;
}
//修改弹框样式
/deep/.ant-modal{
  .ant-modal-header{
    border-bottom: 0;
    .ant-modal-title{
      font-size: 20px;
      color: #333333;
      font-weight: bold;
    }
    .ant-modal-close-icon{
      background: #ccc;
      border-radius: 50%;
      padding: 3px;
      color: #666;
    }
  }
}

.des-list{
  list-style: none;
  padding-left: 0;
  line-height: 30px;
  color: #333333;
  .des-item{
    display: flex;
    width: 100%;
    .des-item-title{
      width: 40%;
      display: block;
      font-size: 16px;
    }
    .des-item-data{
      color: #666666;
      font-size: 14px;
    }
  }
}

</style>