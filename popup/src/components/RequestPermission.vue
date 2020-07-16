<template>
  <div class="request-permission">
    <div class="title">
      <span class="app-name">{{ appName }}</span> is requesting to control
    </div>
    <div class="detail"><slot /></div>
    <div class="alert-box">
      Is URL you are visiting really correct?
    </div>
    <div class="actions">
      <btn>許可</btn><btn transparent caution>キャンセル</btn>
    </div>
    <div class="help">
      <btn transparent inline>Need help?</btn>
    </div>
  </div>
</template>

<script lang="ts">
import Btn from "./Btn.vue";
export default {
  components: { Btn },
  name: "RequestPermission",
  data: () => ({
    appName: "マイナイミテイター",
  }),
};
</script>

<style lang="scss" module>
.request-permission {
  .title {
    font-size: 1.3em;
    text-align: center;
    .app-name {
      font-weight: bold;
    }
  }
  .alert-box {
    padding: 0.8em;
    font-size: 0.9em;
    background-color: #ffee77;
    border-radius: 6px;
    margin: 9px;
  }
  .help {
    text-align: right;
  }
}
</style>
