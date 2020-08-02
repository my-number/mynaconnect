<template>
  <btn inline transparent class="back-button" @click="$router.go(-1)">
    <span class="icon-arrow_back"></span>
    戻る
  </btn>
</template>

<script lang="ts">
import Btn from "./Btn.vue";
export default {
  components: { Btn },
  name: "BackBtn",
};
</script>

<style lang="scss"></style>
