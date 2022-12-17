<template>
  <div id="components-modal-demo-position">
    <a-button type="primary" @click="() => (modal2Visible = true)">
      Vertically centered modal dialog
    </a-button>
    <a-modal
      v-model="modal2Visible"
      title="Vertically centered modal dialog"
      centered
      @ok="() => (modal2Visible = false)"
    >
      <p>some contents...</p>
      <p>some contents...</p>
      <p>some contents...</p>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modal2Visible: false,
    };
  },
  methods: {
    setModal1Visible(modal1Visible) {
      this.modal1Visible = modal1Visible;
    },
  },
};
</script>
