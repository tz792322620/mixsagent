<template>
  <div class="pa-6">
    <div class="card pa-6">
      <div class="font-size-30 font-bold mb-6">联系我们</div>
      <div class="contact">
        <img class="contact-icon" src="../../assets/icon/news.svg" alt="" />
        <div class="contact-msg">
          <span>咨询</span>
          <div>点击进入在线咨询</div>
        </div>
        <span class="contact-btn">咨询</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactUs',
  data() {
    return {}
  },
  watch: {},
  created() {},
  methods: {},
}
</script>

<style scoped lang="less">
.contact {
  width: 240px;
  height: 300px;
  background: #f8ffff;
  border-radius: 10px;
  margin-top: 60px;
  margin-left: 80px;
  padding: 50px 0;
  box-shadow: 0px 1px 3px 0px rgba(73, 177, 179, 0.6);
  display: flex;
  align-items: center;
  flex-direction: column;
  .contact-msg {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    margin: 28px 0;
  }
  .contact-btn {
    color: #49b1b3;
    font-size: 18px;
    width: 80px;
    height: 40px;
    border-radius: 20px;
    border: 2px solid #49b1b3;
    text-align: center;
    line-height: 38px;
    cursor: pointer;
  }
}
</style>
