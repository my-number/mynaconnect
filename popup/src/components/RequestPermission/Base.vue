<template>
  <div class="request-permission">
    <div class="title">
      <span class="app-name">{{ appName }}</span
      >が操作を求めています
    </div>
    <div class="detail-container">
      <div class="detail">
        <slot></slot>
      </div>
    </div>
    <div class="alert-box">
      呼び出し元のURLは本当に正しいですか？今一度ご確認をお願いします。
    </div>
    <div class="actions">
      <btn @click="allow">許可</btn>

      <btn transparent caution @click="deny">キャンセル</btn>
    </div>
    <need-help></need-help>
  </div>
</template>

<script lang="ts">
import Btn from "../Btn.vue";
import NeedHelp from "../NeedHelp.vue";
export default {
  components: { Btn, NeedHelp },
  name: "RequestPermission",
  props: {
    appName: {
      type: String,
      required: true,
    },
  },
  methods: {
    allow() {
      this.$router.push("/select-reader");
    },
    deny() {
      this.$store.state.channel.sendResult({
        success: false,
        cancelled: true,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.request-permission {
  .title {
    font-size: 1.3em;
    text-align: center;
    .app-name {
      font-weight: bold;
    }
  }
  .alert-box {
    padding: 0.8rem;
    font-size: 0.9rem;
    background-color: #ffee77;
    border-radius: 6px;
    margin: 1rem;
  }
  .help {
    text-align: right;
  }
  .detail-container {
    display: flex;
    justify-content: center;
  }
  .actions {
    margin: 1.5rem;
  }
}
</style>
