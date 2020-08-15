<template>
  <div class="btn" :class="classes" @click="$emit('click')">
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
  padding: 0.6rem;
  //margin: 0.2rem;
  background-color: #377ee1;
  color: white;
  font-weight: bold;
  font-size: 1em;
  user-select: none;
  &:active {
    background-color: #1e65c8;
  }
  &.caution {
    background-color: #f44336;
    &:active {
      background-color: #b73228;
    }
  }
  &.transparent {
    color: #377ee1;
    background-color: transparent;
    &:active {
      background-color: rgba(0, 0, 0, 0.25);
    }
    &.caution {
      color: #f44336;
    }
  }
  &.inline {
    display: inline-block;
  }
}
</style>
