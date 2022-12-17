<!-- > 佣金说明 <-->
<template>
  <div class="pa-6">
    <div class="card pa-6">
      <div class="font-size-30 font-bold mb-6">佣金说明</div>
      <div class="font-size-18 primary-color d-flex py-3 mt-6" style="border-bottom: 1px solid #eee">
        <div class="primary-border-bottom-color py-2 px-4">佣金钱包</div>
      </div>
      <div class="title">佣金计算方式</div>
      <p class="rules-list">
        佣金 = 合约净输赢+体育净输赢；<br />
        资金费 = 持仓金额*费率;<br />
        合约净输赢 = 名下用户合约净输赢 * 佣金比例;<br />
        体育净输赢 = 名下用户体育净输赢 * 佣金比例;
      </p>
      <p class="tips">
        注：请谨记任何使用无诚信的方法以骗取佣金将会被永久冻结账号，并终止合作关系，所有佣金一概不予发放。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  watch: {},
  created() {},
  methods: {},
}
</script>

<style scoped lang="less">
.primary-color {
  color: @primary-color;
}
.primary-border-bottom-color {
  border-bottom: 1px solid @primary-color;
}
.title {
  color: #333333;
  font-size: 16px;
  margin-top: 40px;
  font-weight: 600;
}
.rules-list {
  line-height: 30px;
  margin-top: 30px;
  font-size: 16px;
  font-size: 500;
}
.tips {
  color: #ff4a4a;
  font-size: 22px;
  font-weight: 500;
}
</style>
