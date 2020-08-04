<template>
  <div class="container">
    <slot />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Container",
});
</script>
<style scoped>
.container {
  min-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
