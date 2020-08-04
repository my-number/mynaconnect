<template>
  <div class="list-item" :class="{ button, header }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: "ListItem",
  props: {
    button: Boolean,
    header: Boolean,
  },
};
</script>

<style lang="scss">
.list-item {
  height: 3rem;
  line-height: 3rem;
  padding-left: 1rem;
  background-color: white;
  &.button:active {
    background-color: #ccc;
  }
  &.header {
    height: 1.5rem;
    line-height: 1.5rem;
    padding-left: 0rem;
    background-color: transparent;
  }
}
</style>
