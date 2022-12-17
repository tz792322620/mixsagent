
<template>
  <div class="pa-6">
    <div class="card pa-6">
      <div class="font-size-30 font-bold mb-6">VIP专享</div>
      <div class="font-size-30 font-bold font-border">
        <span class="text">等级表规则</span>
      </div>
      <a-table :columns="columns" :data-source="data" class="mt-8 headBold" :pagination="false"> </a-table>
      <div class="tips">
        <span>* 注 </span>
        <p>
          默认按高等级VIP发放佣金，高等级VIP如果未达到本等级增长要求，可按对应等级的增长标准与奖励制度执行，只可享受一个等级奖励；
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const columns = [
  {
    title: '级别',
    dataIndex: 'id',
    // key: 'id',
    // scopedSlots: { customRender: 'name' },
    align: 'center',
  },
  {
    title: '活跃会员',
    dataIndex: 'levelName',
    key: 'levelName',
    // width: 100,
    align: 'center',
  },
  {
    title: '新增活跃会员',
    dataIndex: 'address',
    key: 'address 1',

    align: 'center',
  },
  {
    title: '额外佣金',
    dataIndex: 'address',
    key: 'address 2',

    align: 'center',
  },
]

const data = [
  {
    id: 'VIP1',
    levelName: '≥30',
    age: '≥11',
    address: '佣金的2.00%，最高1888.00元',
  },
  {
    id: 'VIP2',
    levelName: '≥51',
    age: '≥25',
    address: '佣金的2.00%，最高2888.00元',
  },
  {
    id: 'VIP3',
    levelName: '≥101',
    age: '≥35',
    address: '佣金的3.00%，最高3888.00元',
  },
  {
    id: 'VIP4',
    levelName: '≥181',
    age: '≥45',
    address: '佣金的4.00%，最高6888.00元',
  },
  {
    id: 'VIP5',
    levelName: '≥301',
    age: '≥60',
    address: '佣金的5.00%，最高8888.00元',
  },
]
export default {
  name: 'PartnerExclusive',
  data() {
    return {
      data,
      columns,
    }
  },
  watch: {},
  created() {
    // this.renderStripe()
  },
  methods: {
    renderStripe() {
      const table = document.getElementsByClassName('ant-table-row')
      if (table.length > 0) {
        const rowList = [...table]
        rowList.map((row, index) => {
          if (index % 2 !== 0) {
            row.style.backgroundColor = '#f9f9f9'
          } else {
            row.style.backgroundColor = '#ffffff'
          }
        })
      }
    },
  },
}
</script>

<style scoped lang="less">
/deep/.ant-table-tbody tr:nth-child(2n) {
  background-color: #f7f7f7;
}

/deep/.headBold {
  .ant-table-header-column {
    font-weight: bold; // 字体加粗
    background-color: #f7f7f7;
  }
  .ant-table-thead > tr > th {
    background-color: #f7f7f7;
  }
}
.font-border {
  text-align: center;
}
.font-border {
  position: relative;
  z-index: 99;
  .text::after {
    content: '';
    position: absolute;
    width: 260px;
    height: 15px;
    background: #49b1b3;
    border-radius: 8px;
    bottom: 2px;
    left: calc(50% - 130px);
    z-index: -1;
  }
}
.tips {
  font-size: 16px;
  font-weight: bold;
  margin-top: 40px;
}
</style>
