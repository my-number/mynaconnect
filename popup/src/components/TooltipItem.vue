<template>
  <span class="tooltip-item" @click="showTooltip">
    <span class="text"><slot></slot></span>
    <!--<span class="info"><span class="icon-help_outline"></span></span> for now-->
  </span>
</template>

<script lang="ts">
export default {
  name: "TooltipItem",
  props: {
    textId: {
      type: String,
      required: false, // false for now
    },
  },
  methods: {
    showTooltip() {
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.tooltip-item {
  .info {
    display: inline-block;

    color: #aaa;
    font-size: 1em;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      color: #ccc;
    }
  }
}
</style>
