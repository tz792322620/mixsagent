<template>
  <a-card :bordered="false">
    <!-- 查询区域 -->
    <div class="table-page-search-wrapper">
      <a-form layout="inline" @keyup.enter.native="searchQuery">
        <a-row :gutter="24">
        </a-row>
      </a-form>
    </div>
    <!-- 查询区域-END -->

    <!-- 操作按钮区域 -->
    <div class="table-operator">
<!--      <a-button @click="handleAdd" type="primary" icon="plus">新增</a-button>-->
      <a-button type="primary" icon="download" @click="handleExportXls('提币记录')">导出</a-button>
<!--      <a-upload name="file" :showUploadList="false" :multiple="false" :headers="tokenHeader" :action="importExcelUrl" @change="handleImportExcel">-->
<!--        <a-button type="primary" icon="import">导入</a-button>-->
<!--      </a-upload>-->
      <!-- 高级查询区域 -->
      <j-super-query :fieldList="superFieldList" ref="superQueryModal" @handleSuperQuery="handleSuperQuery"></j-super-query>
      <a-dropdown v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1" @click="batchDel"><a-icon type="delete"/>删除</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px"> 批量操作 <a-icon type="down" /></a-button>
      </a-dropdown>
    </div>

    <!-- table区域-begin -->
    <div>
      <div class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
        <i class="anticon anticon-info-circle ant-alert-icon"></i> 已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a>项
        <a style="margin-left: 24px" @click="onClearSelected">清空</a>
      </div>

      <a-table
        ref="table"
        size="middle"
        :scroll="{x:true}"
        bordered
        rowKey="id"
        :columns="columns"
        :dataSource="dataSource"
        :pagination="ipagination"
        :loading="loading"
        :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
        class="j-table-force-nowrap"
        @change="handleTableChange">

        <template slot="status" slot-scope="status" >
          <div :key="status">
            <span  v-if="status==0">审核中</span>
            <span  v-if="status==1">审核通过</span>
            <span  v-if="status==2">打币中</span>
            <span  v-if="status==3">已到账</span>
            <span  v-if="status==4">拒绝</span>
          </div>
        </template>
        <template slot="htmlSlot" slot-scope="text">
          <div v-html="text"></div>
        </template>
        <template slot="imgSlot" slot-scope="text,record">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无图片</span>
          <img v-else :src="getImgView(text)" :preview="record.id" height="25px" alt="" style="max-width:80px;font-size: 12px;font-style: italic;"/>
        </template>
        <template slot="fileSlot" slot-scope="text">
          <span v-if="!text" style="font-size: 12px;font-style: italic;">无文件</span>
          <a-button
            v-else
            :ghost="true"
            type="primary"
            icon="download"
            size="small"
            @click="downloadFile(text)">
            下载
          </a-button>
        </template>

        <span slot="action" slot-scope="text, record">
          <a @click="handleEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link">更多 <a-icon type="down" /></a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a @click="handleDetail(record)">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete(record.id)">
                  <a>删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </span>

      </a-table>
    </div>

    <agent-withdrawal-record-modal ref="modalForm" @ok="modalFormOk"></agent-withdrawal-record-modal>
  </a-card>
</template>

<script>

  import '@/assets/less/TableExpand.less'
  import { mixinDevice } from '@/utils/mixin'
  import { JeecgListMixin } from '@/mixins/JeecgListMixin'
  import AgentWithdrawalRecordModal from './modules/AgentWithdrawalRecordModal'
  import {filterMultiDictText} from '@/components/dict/JDictSelectUtil'

  export default {
    name: 'AgentWithdrawalRecordList',
    mixins:[JeecgListMixin, mixinDevice],
    components: {
      AgentWithdrawalRecordModal
    },
    data () {
      return {
        description: '提币记录管理页面',
        // 表头
        columns: [

          {
            title:'代理商编号',
            align:"center",
            dataIndex: 'agentId'
          },
          {
            title:'提现金额',
            align:"center",
            dataIndex: 'amount'
          },
          {
            title:'上级编号',
            align:"center",
            dataIndex: 'parentId'
          },
          {
            title:'提现地址',
            align:"center",
            dataIndex: 'virtualAddress'
          },
          {
            title:'状态',
            align:"center",
            dataIndex: 'status',
            key:'status',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            dataIndex: 'action',
            align:"center",
            fixed:"right",
            width:147,
            scopedSlots: { customRender: 'action' }
          }
        ],
        url: {
          list: "/agentwithdrawalrecord/agentWithdrawalRecord/list",
          delete: "/agentwithdrawalrecord/agentWithdrawalRecord/delete",
          deleteBatch: "/agentwithdrawalrecord/agentWithdrawalRecord/deleteBatch",
          exportXlsUrl: "/agentwithdrawalrecord/agentWithdrawalRecord/exportXls",
          importExcelUrl: "agentwithdrawalrecord/agentWithdrawalRecord/importExcel",
          
        },
        dictOptions:{},
        superFieldList:[],
      }
    },
    created() {
    this.getSuperFieldList();
    },
    computed: {
      importExcelUrl: function(){
        return `${window._CONFIG['domianURL']}/${this.url.importExcelUrl}`;
      },
    },
    methods: {
      initDictConfig(){
      },
      getSuperFieldList(){
        let fieldList=[];
        fieldList.push({type:'string',value:'agentId',text:'代理商编号'})
        fieldList.push({type:'number',value:'amount',text:'提现金额'})
        fieldList.push({type:'string',value:'parentId',text:'上级编号'})
        fieldList.push({type:'string',value:'virtualAddress',text:'提现地址'})
        fieldList.push({type:'int',value:'status',text:'状态'})
        this.superFieldList = fieldList
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