<template>
  <div class="need-help">
    <btn transparent inline>お困りですか?</btn>
  </div>
</template>

<script lang="ts">
import Btn from "./Btn.vue";
export default {
  components: { Btn },
  name: "NeedHelp",
  props: {
    textId: String,
  },
};
</script>

<style lang="scss" scoped>
.need-help {
  text-align: right;
}
</style>
