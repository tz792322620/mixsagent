<!--  下级代理管理 -->
<template>
<div  class="pa-6">
  <div class="card pa-6" v-if="showType == 'list'" :bordered="false">
    <!-- 头部标题 -->
    <div class="title-top">
        <div class="font-size-30 font-bold">下级代理管理</div>
        <div class="btn" @click="handleRefe"><a-icon type="redo" />刷新</div>
    </div>

    <!-- 查询区域 -->


    <div style="margin-bottom: 30px">
      <a-form :form="searchForm" :label-col="{ span: 6 }" :wrapper-col="{ span: 8 }">

        <div class="d-flex mt-6">
          <div class="d-flex">
            <div class="d-flex align-center">
              <a-form-item label="代理商编号">
                <a-input placeholder="代理商编号" v-model="searchForm.Id" style="width: 220px"></a-input>
              </a-form-item>
            </div>
          </div>
          <div class="px-6"></div>

          <div class="d-flex">
            <div class="d-flex align-center">
              <a-form-item label="代理商手机">
                <a-input placeholder="代理商手机" v-model="searchForm.phone" style="width: 220px"></a-input>
              </a-form-item>
            </div>
          </div>
          <div class="px-6"></div>
          <div class="d-flex">
            <div class="d-flex align-center">
              <a-form-item label="代理商邮箱">
                <a-input placeholder="代理商邮箱" v-model="searchForm.email" style="width: 220px"></a-input>
              </a-form-item>
            </div>
          </div>

        </div>
        <div class="d-flex">
          <div class="d-flex align-center">
            <!-- <div class="min-width-80px">注册时间:</div> -->
            <a-form-item label="等级：">
              <a-select
                placeholder="等级"
                v-model="searchForm.level" style="width: 220px">
                <a-select-option value="1">
                  1
                </a-select-option>
                <a-select-option value="2">
                  2
                </a-select-option>
                <a-select-option value="3">
                  3
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
      >
        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="tradingStatus" slot-scope="tradingStatus">
          <div :key="tradingStatus">
            <span v-if="tradingStatus == 0">正常</span>
            <span v-if="tradingStatus == 1">冻结</span>
          </div>
        </template>
        <template slot="status" slot-scope="status">
          <div :key="status">
            <span v-if="status == 0">正常</span>
            <span v-if="status == 1">停用</span>
          </div>
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
          <a-dropdown class="table-handle-btn">
            <a class="ant-dropdown-link table-handle-btn">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
               <!-- <a-menu-item>
                <a @click="editModel = true">编辑</a>
              </a-menu-item> -->
              <a-menu-item v-if="record.tradingStatus == 0">
                <a  @click="jzjy(record)">禁止交易</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="jbdl(record)">解绑代理</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>
      </a-table>
    </div>

    <child-agent-modal ref="modalForm" @ok="modalFormOk" />

    <!-- 编辑弹框 -->
     <a-modal v-model="editModel" :title="modelTitle" centered @ok="() => (editModel = false)" :footer="null">
        <a-form :form="editForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" >
            <a-form-item label="代理商账号:">
              <a-input placeholder="请输入代理商账号" />
            </a-form-item>
            <a-form-item label="密码:">
              <a-input placeholder="请输入密码" />
            </a-form-item>
            <a-form-item label="代理商地址:">
              <a-input placeholder="请输入代理商地址" />
            </a-form-item>
            <a-form-item label="用户编号:">
              <a-input placeholder="请输入用户编号" />
            </a-form-item>
            <a-form-item label="上级代理:">
              <a-input placeholder="请输入上级代理" />
            </a-form-item>
            <a-form-item label="下级代理:">
              <a-input placeholder="请输入下级代理" />
            </a-form-item>
            <a-form-item label="等级:">
              <a-input placeholder="请输入等级" />
            </a-form-item>
            <a-form-item label="邮箱:">
              <a-input placeholder="请输入邮箱" />
            </a-form-item>
        </a-form>
        <div class="d-flex justify-space-around">
            <a-button class="canc-btn">取消</a-button>
            <a-button class="sub-btn">确定</a-button>
        </div>
    </a-modal>
  </div>

  <!--    显示详情-->
  <div v-if="showType == 'detail'">
    <ChildUserBaseInfo :id="showInfoId" @back="closeInfoPage" />
  </div>
</div>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import ChildUserBaseInfo from './modules/ChildUserBaseInfo'
import ChildAgentModal from './modules/ChildAgentModal'
import '@/assets/less/TableExpand.less'
import { postAction, getAction } from '@/api/manage'
import {postActions} from "../../../api/manage";

export default {
  name: 'ChildAgentList',
  mixins: [JeecgListMixin],
  components: {
    ChildAgentModal,
    ChildUserBaseInfo,
  },
  data() {
    return {
      description: '下级代理列表管理页面',
      showType: 'list', //页面显示卡片类型   list  detail  label
      // 表头
      columns: [
        {
          title: '代理商账号',
          align: 'center',
          dataIndex: 'name',
        },

        {
          title: '密码',
          align: 'center',
          dataIndex: 'password',
        },
        {
          title: '提币地址',
          align: 'center',
          dataIndex: 'address',
        },
        {
          title: '用户编号',
          align: 'center',
          dataIndex: 'userId',
        },
        {
          title: '下级代理',
          align: 'center',
          dataIndex: 'parentIds',
        },
        {
          title: '等级',
          align: 'center',
          dataIndex: 'level',
        },
        {
          title: '手机',
          align: 'center',
          dataIndex: 'phone',
        },
        {
          title: '邮箱',
          align: 'center',
          dataIndex: 'email',
        },
        {
          title: '创建时间',
          align: 'center',
          dataIndex: 'createTime',
        },
        {
          title: '交易状态',
          align: 'center',
          dataIndex: 'tradingStatus',
          scopedSlots: { customRender: 'tradingStatus' },
        },
        {
          title: '状态',
          align: 'center',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
        },
        {
          title: '操作',
          dataIndex: 'action',
          align: 'center',

          scopedSlots: { customRender: 'action' },
        },
      ],
      dataSource: [],
      url: {
        list: '/childagent/childAgent/list',
        delete: '/childagent/childAgent/delete',
        deleteBatch: '/childagent/childAgent/deleteBatch',
        exportXlsUrl: '/childagent/childAgent/exportXls',
        importExcelUrl: 'childagent/childAgent/importExcel',
      },
      dictOptions: {},
      superFieldList: [],
      editModel: false,
      modelTitle: "新增",
      pageQuery: {
        pageNo: 1,
        pageSize: 10
      },
      searchForm: {},
      // searchQuery: {},
      loading: false,
      editForm: {}
    }
  },
  created() {
    // this.getSuperFieldList()
    this.getList();
  },
  computed: {
    importExcelUrl: function () {
      return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`
    },
  },
  methods: {
    initDictConfig() {},
    getSuperFieldList() {
      let fieldList = []
      fieldList.push({ type: 'string', value: 'name', text: '代理商账号' })
      fieldList.push({ type: 'string', value: 'password', text: '密码' })
      fieldList.push({ type: 'string', value: 'address', text: '代理商地址' })
      fieldList.push({ type: 'string', value: 'userId', text: '用户id' })
      fieldList.push({ type: 'string', value: 'parentId', text: '父级id' })
      fieldList.push({
        type: 'string',
        value: 'parentIds',
        text: '父级id集合，虽然只有三级，但是为了方便查询收益记录所以设置此字段',
      })
      fieldList.push({ type: 'int', value: 'level', text: '等级' })
      fieldList.push({ type: 'string', value: 'phone', text: '手机' })
      fieldList.push({ type: 'string', value: 'email', text: '邮箱' })
      this.superFieldList = fieldList
    },
    jzjy(record){
      let id = record.id
      postActions('/childagent/childAgent/prohibitedTransactions',{id:id})
        .then(res => {
          console.log('禁止交易', res)
          if (res.success) {
            this.$notification.success({
              message: '提示',
              description: res.message,
            });
            this.handleRefe()
          }
        })
    },
    jbdl(record){
      let id = record.userId
      postActions('/userlist/userList/disableAgent',{id:id})
        .then(res => {
          console.log('解绑代理', res)
          if (res.success) {
            this.$notification.success({
              message: '提示',
              description: res.message,
            });
            this.handleRefe()
          }
        })
    },
    //新增
    handleAdd() {
      this.modelTitle = '新增';
      this.editModel = true;
    },
    //编辑
    handleEdit() {
      this.modelTitle = '编辑';
      this.editModel = true;
    },
    // 详情
    // 显示详情
    handleDetail(id) {
      this.showType = 'detail'
      // debugger
      // return
      this.showInfoId = id
      this.AgentAssetDetails(id)
    },

    // 关闭基本信息
    closeInfoPage() {
      this.showType = 'list'
      this.isShowInfoPage = false

    },
    // 删除
    handleDel() {
      this.$confirm({
        title: '提示',
        content: '确认删除代理商？',
        okText: '确认',
        cancelText: '取消',
        centered: 'true'
      });

    },
    // 查询代理信息
    AgentAssetDetails(id) {
      getAction('/childagent/childAgent/findAgentAssetDetails',{id:id}).then(res =>{
        // console.log(res);
        if(res.success){
          console.log(res);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    // 查询列表数据
    getList(searchQuery) {
      this.loading = true;
      // debugger
      getAction('/childagent/childAgent/list',Object.assign(this.pageQuery,searchQuery)).then(res =>{
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
      this.pageQuery={
            pageNo: 1,
          pageSize: 10
      }
      this.searchForm = {};
      this.getList();
    },
  },
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