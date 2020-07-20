<template>
  <span class="tooltip-item">
    <span class="text"><slot></slot></span>
    <span class="info">i</span>
  </span>
</template>

<script lang="ts">
export default {
  name: "TooltipItem",
  props: ["tooltip"]
};
</script>

<style lang="scss" scoped>
.tooltip-item{
    .info{
        
    }
}
</style>
