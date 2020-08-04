<template>
  <request-permission :app-name="$store.state.appName">
    以下の内容が送信されます
    <ul>
      <li>
        <tooltip-item text-id="cert">電子証明書(利用者証明用)</tooltip-item>
      </li>
      <li><tooltip-item text-id="pubkey">公開鍵</tooltip-item></li>
    </ul>
    以下の内容は送信されません
    <ul>
      <li>氏名、住所、性別、生年月日</li>
      <li><tooltip-item text-id="mynumber">個人番号</tooltip-item></li>
    </ul>
  </request-permission>
</template>

<script lang="ts">
import RequestPermission from "./Base.vue";
import TooltipItem from "../TooltipItem.vue";
export default {
  name: "GetAuthCert",
  components: {
    RequestPermission,
    TooltipItem,
  },
};
</script>
