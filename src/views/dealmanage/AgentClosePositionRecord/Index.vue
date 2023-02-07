<template>
  <div class="pa-6">
    <div class="card pa-6">
    <div class="title-top">
        <div class="font-size-30 font-bold">平仓记录</div>
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
                    <a-select-option value="0">
                      永续
                    </a-select-option>
                    <a-select-option value="1">
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
<!--                  v-model="searchForm.createTime"-->
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
      <!-- <a slot="direction" slot-scope="text">{{ text }}1</a>
      <template  slot="direction" slot-scope="text">
        <span style="color:#2EBD85">{{text}}</span>
      </template> -->
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
import { getAction } from '@/api/manage'
//表头
const columns = [
  // {
  //   title: '序号',
  //   dataIndex: 'id',
  //   key: 'id',
  //   scopedSlots: { customRender: 'name' },
  // },
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
    title: '合约品种',
    dataIndex: 'displayName',
    key: 'displayName',

  },
  {
    title: '方向',
    dataIndex: 'direction',
    key: 'direction',

    scopedSlots: { customRender: 'direction' },
  },
  {
    title: '逐仓/全仓',
    dataIndex: 'depotType',
    key: 'depotType',
    scopedSlots: { customRender: 'depotType' },
  },
  {
    title: '结算盈亏',
    dataIndex: 'entrustAmount',
    key: 'entrustAmount'
  },
  // {
  //   title: '盈亏率',
  //   dataIndex: 'depotType',
  //   key: 'depotType'
  // },
  // {
  //   title: '强平风险金',
  //   dataIndex: 'mail2',
  //   key: 'mail2'
  // },
  {
    title: '杠杆倍数',
    dataIndex: 'lever',
    key: 'lever'
  },
  // {
  //   title: '持仓均价',
  //   dataIndex: 'mail5',
  //   key: 'mail5'
  // },
   {
    title: '平仓价格',
    dataIndex: 'closeDepotPrice',
    key: 'closeDepotPrice'
  },
   {
    title: '手续费',
    dataIndex: 'profitLoss',
    key: 'profitLoss'
  },
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
    address:"持仓",
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
  name: "AgentClosePositionRecord",
  components: {
  },
  data() {
    return {
      startTime:'',
      endTime:'',
      timeEl:[],
      allowClear:false,
      bidui:[],
      columns,
      dataSource:[],
      visible: false,
      loading: false,
      pageQuery: {
        pageNo: 1,
        pageSize: 10
      },
      searchForm:{},
    }
  },
  created() {
    this.getListbd();
    this.getList();
  },
  methods: {
    handleChange(item){
      console.log(item)
    },
    onChange(date, dateString) {
      this.searchForm.startTime = dateString[0];
      this.searchForm.endTime = dateString[1];

      console.log(this.searchForm);
    },
    // 获取记录列表
    getPositionRecordList(){
    //   getPositionRecord({}).then((res)=>{
    //     if(res.success){
    //       const data = res.result;
    //       this.dataSouce = data;
    //       console.log("表格数据",this.dataSouce);
    //     }else{
    //     }
    //   });
    },
    handleRefe() {
      this.getList()
    },
    handleOk(){
      this.visible =false
    },
    getListbd() {
      getAction('/business/contract/getContractBoxList')
        .then(res => {
          this.bidui = res.result
          console.log(this.bidui)
        })
    },
    // 查询列表数据
    getList(searchQuery) {
      this.loading = true
      // debugger
      getAction('/business/userOrder/closeHoldingList', Object.assign(this.pageQuery, searchQuery))
        .then(res => {
          console.log(res);
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
    //删除提示框
    handleDel() {
      this.$confirm({
        title: '提示',
        content: '确认删除平仓记录？',
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
@import '~@assets/less/common.less';
.mobile .d-flex {
    display: -ms-flexbox;
    display: block;
}

.mobile .float-search-btn {
    position: inherit;
    margin-top: 10px;
}

.card {
  background-color: white;
  border-radius: 10px;
}


</style>

<style scoped  lang="less">
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
    }
    .des-item-data{
      color: #666666;
      font-size: 14px;
    }
  }
}

</style>