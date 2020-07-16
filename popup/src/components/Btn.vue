<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: "Btn",
  props: {
    transparent: Boolean,
    caution: Boolean,
    inline: Boolean,
  },
  computed: {
    classes() {
      return {
        btn: true,
        transparent: this.transparent,
        caution: this.caution,
        inline: this.inline,
      };
    },
  },
};
</script>
<style lang="scss">
.btn {
  border-radius: 0.5em;
  font-family: sans-serif;
  text-align: center;
  padding: 0.6em;
  margin: 0.2em;
  background-color: #377ee1;
  color: white;
  font-weight: bold;
  font-size: 1em;
  user-select: none;
  &:active {
    background-color: #1e65c8;
  }
  &.transparent {
    color: #377ee1;
    background-color: rgba(0, 0, 0, 0);
    &:active {
      background-color: rgba(0, 0, 0, 0.25);
    }
    &.caution {
      color: #ff4545;
    }
  }
  &.inline {
    display: inline-block;
  }
}
</style>
