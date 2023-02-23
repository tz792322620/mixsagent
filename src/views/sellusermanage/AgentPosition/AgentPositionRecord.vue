<template>
<!-- 弃用 -->
  <div class="page-header-index-wide" style="padding: 30px">

    <div class="card pa-6">
      <div class="font-size-30 font-bold">持仓记录</div>

      <div class="d-flex mt-6">
        <div class="d-flex align-center">
          <div class="min-width-80px">下级账号: </div>
          <a-input placeholder="请输入下级账号" style="width: 220px"></a-input>
        </div>
        <div class="px-6"></div>
        <div class=" d-flex align-center">
          <div class="min-width-80px">场次: </div>
          <a-select
            label-in-value
            :default-value="{ key: 'lucy' }"
            style="width: 220px"
            @change="handleChange"
          >
            <a-select-option value="jack">
              Jack (100)
            </a-select-option>
            <a-select-option value="lucy">
              Lucy (101)
            </a-select-option>
          </a-select>
        </div>
      </div>

      <div class="d-flex mt-6">
        <div class="d-flex">
          <div class="d-flex align-center">
            <div class="min-width-80px">状态: </div>
            <a-select
              label-in-value
              :default-value="{ key: 'all' }"
              style="width: 220px"
              @change="handleChange"
            >
              <a-select-option value="all">
                全部
              </a-select-option>
              <a-select-option value="lucy">
                已结算
              </a-select-option>
              <a-select-option value="lucy1">
                未结算
              </a-select-option>
              <a-select-option value="lucy2">
                取消
              </a-select-option>
              <a-select-option value="lucy3">
                无效
              </a-select-option>
            </a-select>
          </div>
          <div class="px-6"></div>
          <div class=" d-flex align-center">
            <div class="min-width-80px">投注时间: </div>
            <a-range-picker style="width: 220px"></a-range-picker>
          </div>
        </div>
        <div class="px-6"></div>
        <div>
          <a-button class="mr-6 search-btn-circle" type="primary">筛选</a-button>
          <a-button class="clear-btn-circle">重置</a-button>
        </div>
      </div>

      <a-table  :columns="columns" :data-source="dataSouce" class="mt-4">
        <template slot="depotType" slot-scope="depotType" >
          <div :key="depotType">
            <span  v-if="depotType==0">逐仓</span>
            <span  v-if="depotType==1">全仓</span>
          </div>
        </template>
        <template slot="tradeStatus" slot-scope="tradeStatus" >
          <div :key="tradeStatus">
            <span  v-if="tradeStatus==0">委托中</span>
            <span  v-if="tradeStatus==1">已完成</span>
            <span  v-if="tradeStatus==2">已撤单</span>
          </div>
        </template>
        <span slot="action" slot-scope="text, record">
          <a class="mr-4" @click="visible = true">详情</a>
          <a class="mr-4" @click="handleDel">删除</a>
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
    dataIndex: '',
    key: 'levelName',
    // width: 100,
  },
  {
    title: '用户姓名',
    dataIndex: 'name',
    key: 'name',

  },
  {
    title: '持仓额(USDT)',
    dataIndex: 'address',
    key: 'address 2',

  },
  {
    title: '有效持仓(USDT)',
    dataIndex: 'address',
    key: 'address 3',

  },
  {
    title: '委托数量',
    dataIndex: 'entrustAmount',
    key: 'entrustAmount'
  },
  {
    title: '邮箱',
    dataIndex: 'mail',
    key: 'mail'
  },
  {
    title: '类型',
    dataIndex: 'depotType',
    key: 'depotType',

    scopedSlots: { customRender: 'depotType' }
  },
  {
    title: '状态',
    dataIndex: 'tradeStatus',
    key: 'tradeStatus',

    scopedSlots: { customRender: 'tradeStatus' }
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    key: 'createTime',

  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
];

const data = [
  {
    id: '1',
    levelName: 'ZX776',
    age: 32,
    address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
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
  name: "IndexChart",
  components: {
  },
  data() {
    return {
      data,
      columns,
      dataSouce:[],
      visible: false
    }
  },
  created() {
    this.getPositionRecordList();
  },
  methods: {
    handleChange(item){
      console.log(item)
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
    //删除提示框
    handleDel() {
      this.$confirm({
        title: '提示',
        content: '确认删除投注记录？',
        okText: '确认',
        cancelText: '取消',
        centered: 'true'
      });
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
  line-height: 24px;
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