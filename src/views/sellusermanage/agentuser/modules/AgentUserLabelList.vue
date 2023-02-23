<!-- 标签管理 -->
<template>
  <div v-show="isShowLabel">
    <div v-if="loading" class="d-flex justify-center" style="margin-top: 20vh">
      <a-spin size="large" />
    </div>
    <div v-else>
      <div class="card">
        <!-- 头部 -->
        <div class="d-flex" style="justify-content: space-between;align-items: center;">
            <div @click="close()" class="baseInfo-card-title align-center">
                <a-icon type="left" style="font-size: 22px" />
                &nbsp;标签管理
            </div>
            <a-button  class="main-color handle-btn" shape="round" @click="handleAdd" icon="plus-circle">新增标签</a-button>
            <!-- <a-icon type="plus-circle" /> -->
        </div>

        <!-- 表格展示 -->
        <div>
            <a-table
                :columns="columns"
                :data-source="data"
                :pagination="{ pageSize: 50 }"
                :scroll="{ y: 240 }"
                >
                <span slot="action" slot-scope="text, record">
                    <a @click="handleEdit">编辑</a>

                    <a-divider type="vertical" />
                    <a class="ant-dropdown-link" @click="delLabel">删除</a>
                </span>
                <a-button type="primary" icon="download" />
            </a-table>
        </div>

        <!-- 标签编辑弹窗 -->
        <a-modal v-model="labelDialog" :title="labelTitle" centered @ok="() => (labelDialog = false)" :footer="null">
            <a-form :form="labelForm" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
                <a-form-item label="会员标签:">
                <a-input placeholder="请输入10字符内的名称"
                    v-decorator="['note', { rules: [{ required: true, message: '请输入10字符内的名称!' }] }]"
                />
                </a-form-item>
            </a-form>
            <div class="d-flex justify-space-around">
                <a-button class="canc-btn">取消</a-button>
                <a-button class="sub-btn">确定</a-button>
            </div>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: '序号',
  },
  {
    title: '会员标签',
    dataIndex: 'name',
  },
  {
    title: '会员数量',
    dataIndex: 'num',
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
  },
];
const data = [
  {
    name: "标签",
    num: '123'
  },
  {
    name: "标签",
    num: '123'
  },
  {
    name: "标签",
    num: '123'
  },
]
export default {
  name: '',
  props: {
    //表单禁用
    isShowLabel: {
      type: Boolean,
    //   required: true
    }
  },

  data () {
    return {
      loading: true,
      columns,
      data,
      labelTitle: '新增标签',
      labelDialog: false,
      isAddLabel: true,
      labelForm: {}
    }
  },
  watch: {},
  created () {

  },
  mounted() {
    this.loading = false;
  },
  methods: {
    close(){
        this.$emit('update:isShowLabel', false)
    },
    // 打开标签弹窗
    handleAdd() {
       this.labelDialog = true;
       this.isAddLabel = true;
       this.labelTitle = "新增标签";
       console.log("新增标签");
    },
    handleEdit() {
       this.labelDialog = true;
       this.isAddLabel = false;
       this.labelTitle = "编辑标签";
       console.log("修改标签");
    },
    //删除标签
    delLabel() {
      this.$confirm({
        title: '提示',
        content: '确认删除标签？',
        okText: '确认',
        cancelText: '取消',
        centered: 'true'
      });
    },
  }
}
</script>

<style scoped lang="less">
.card {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
}

.baseInfo-card-title {
  font-weight: 600;
  font-size: 28px;
  margin-bottom: 20px;
  color: black;
  opacity: 0.75;
}

.d-flex{
  display: flex;
}

.align-center {
  align-items: center;
}

.base-info-box {
  font-size: 16px;
  float: left;
  width: 25%;
}

/*.base-info-box .base-info-desc {*/
/*  opacity: .85;*/
/*}*/
.base-info-box .base-info-data {
  font-weight: bold;
}

.ant-table-striped /deep/ .table-striped td {
  background-color: #fafafa;
}

// 弹出层底部按钮样式
.canc-btn{ //取消按钮
    width: 170px;
    height: 40px;
    border-radius: 3px;
    border: 1px solid #49B1B3;
    color: #49B1B3;
    font-size: 16px;
}
.sub-btn{ //确认按钮
    width: 170px;
    height: 40px;
    background: #49B1B3;
    border-radius: 3px;
    color: #fff;
    font-size: 16px;
}
</style>
