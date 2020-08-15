<template>
  <div class="list-item" :class="{ button, header }">
    <div class="icon" v-show="icon">
      <span :class="icon"></span>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ListItem",
  props: {
    button: Boolean,
    header: Boolean,
    icon: String,
  },
};
</script>

<style lang="scss">
.list-item {
  display: flex;
  flex-direction: row;
  padding: 12px;
  background-color: white;

  .icon {
    display: flex;
    align-items: center;
    padding: 2px;
  }
  &.button:active {
    background-color: #ccc;
  }
  &.header {
    padding: 0.1rem;
    background-color: transparent;
  }
}
</style>
