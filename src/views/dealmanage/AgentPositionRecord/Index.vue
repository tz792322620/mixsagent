<template>
  <div class="pa-6">
    <div class="card pa-6">
        <div class="title-top">
        <div class="font-size-30 font-bold">持仓记录</div>
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
            <div class="px-6"></div>

            <div class="d-flex">
              <div class="d-flex align-center">
                <a-form-item label="逐仓/全仓:">
                  <a-select
                    placeholder="全部"
                    v-model="searchForm.depotType" style="width: 220px">
                    <a-select-option value="0">
                      逐仓
                    </a-select-option>
                    <a-select-option value="1">
                      全仓
                    </a-select-option>

                  </a-select>
                </a-form-item>
              </div>
            </div>
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
                  v-model="searchForm.contractId" style="width: 220px">
                  <a-select-option v-for="(item, index) in bidui" :value="item.virtualCoinPairId" :key="index">
                    {{ item.virtualCoinPairName }}
                  </a-select-option>

                </a-select>
              </a-form-item>
            </div>
<!--            <div class="px-6"></div>-->
<!--            <div class="px-6"></div>-->

            <div class=" d-flex align-center">
              <a-form-item label="成交时间">
                <a-range-picker
                  v-model="searchForm.createTime"
                />
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
        :loading="loading"
        class="j-table-force-nowrap"

      >
      <template  slot="direction" slot-scope="text">
        <span style="color:green" v-if="text == 0">开多</span>
        <span style="color:red" v-if="text == 1">开空</span>
      </template>
      <template  slot="depotType" slot-scope="text">
        <span style="color:green" v-if="text == 0">逐仓</span>
        <span style="color:red" v-if="text == 1">全仓</span>
      </template>
      <span slot="action" slot-scope="text, record">
          <!-- <a @click="handleEdit">编辑</a> -->
          <a class="table-handle-btn"  @click="xq(record)">详情</a>
          <a-dropdown v-if="false">
            <a class="ant-dropdown-link table-handle-btn">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="xq(record)">详情</a>
              </a-menu-item>
              <!-- <a-menu-item>
                <a @click="handleDel">删除</a>
              </a-menu-item> -->
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>
    <!-- 详情弹框 -->
    <a-modal v-model="visible" title="订单详情" centered :footer="null">
      <!-- 详情数据 -->
      <ul class="des-list">
        <li class="des-item">
          <span class="des-item-title">订单编号：</span>
          <span class="des-item-data">{{xqxx.id}}</span>
        </li>
        <li class="des-item">
          <span class="des-item-title">交易时间：</span>
          <span class="des-item-data">{{ xqxx.createTime }}</span>
        </li>
        <li class="des-item">
          <span class="des-item-title">逐仓/全仓：</span>
          <span class="des-item-data">{{ xqxx.depotType }}</span>
        </li>
        <li class="des-item">
          <span class="des-item-title">开仓价格(USDT)：</span>
          <span class="des-item-data">{{ xqxx.openDepotPrice }}</span>
        </li>
        <li class="des-item">
          <span class="des-item-title">合约品种：</span>
          <span class="des-item-data">{{ xqxx.virtualCoinPairName }}</span>
        </li>

        <li class="des-item">
          <span class="des-item-title">下单时间：</span>
          <span class="des-item-data">{{ xqxx.createTime }}</span>
        </li>
      </ul>
    </a-modal>
  </div>
</template>

<script>
import {getPositionRecord} from "@/api/agentUser"
import { getAction } from '@/api/manage'
//表头
const columns = [
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
    title: '合约品种',
    dataIndex: 'virtualCoinPairName',
    key: 'virtualCoinPairName',

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
    title: '逐仓/全仓',
    dataIndex: 'depotType',
    key: 'depotType',
    scopedSlots: { customRender: 'depotType' },

  },
  {
    align: 'center',
    title: '杠杆倍数',
    dataIndex: 'multiple',
    key: 'multiple'
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
    title: '仓位保证金',
    dataIndex: 'tradeStatus',
    key: 'tradeStatus',

  },
  {
    align: 'center',
    title: '开仓价格(持仓均价)',
    dataIndex: 'openDepotPrice',
    key: 'openDepotPrice',

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
    title: '止盈价',
    dataIndex: 'takeProfitPrice',
    key: 'takeProfitPrice',

  },
  {
    align: 'center',
    title: '止损价',
    dataIndex: 'stopLossPrice',
    key: 'stopLossPrice',

  },
  {
    align: 'center',
    title: '仓位创建时间',
    dataIndex: 'createTime',
    key: 'createTime',

  },
  {
    align: 'center',
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];
export default {
  name: "AgentPositionRecord",
  components: {
  },
  data() {
    return {
      xqxx:{},
      bidui:[],
      searchForm:{},
      columns,
      dataSource:[],
      visible: false,
      loading: false,
      pageQuery: {
        pageNo: 1,
        pageSize: 10
      },
    }
  },
  created() {
    this.getListbd();
    this.getList();

  },
  methods: {
    xq(e){
      this.xqxx = e
      this.visible = true
    },
    handleChange(item){
      console.log(item)
    },
    //删除提示框
    handleDel() {
      this.$confirm({
        title: '提示',
        content: '确认删除持仓记录？',
        okText: '确认',
        cancelText: '取消',
        centered: 'true'
      });
    },
    handleOk(){
      this.visible =false
    },
    getListbd() {
      getAction('/business/userOrder/openHoldingList')
        .then(res => {
          this.bidui = res.result
          console.log(this.bidui)
        })
    },
    // 查询列表数据
    getList(searchQuery) {
      this.loading = true
      // debugger
      getAction('/business/userOrder/holdingList', Object.assign(this.pageQuery, searchQuery))
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
    .des-item-title{
      width: 40%;
      display: block;
      font-size: 16px;
      font-weight: 500;
    }
    .des-item-data{
      color: #666666;
      font-size: 14px;
    }
  }
}

</style>