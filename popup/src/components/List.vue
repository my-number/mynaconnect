<template>
  <div class="list" :class="{ inset }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "List",
  props: {
    inset: Boolean,
  },
};
</script>

<style lang="scss">
.list {
  border-color: #ccc;
  border-style: solid;
  border-width: 1px 0px;
  overflow: hidden;
  &.inset {
    margin: 10px;
    border-width: 1px;
    border-radius: 10px;
  }
  > * {
    border-bottom: 1px solid #ccc;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
