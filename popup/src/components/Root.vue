<template>
  <Spinner></Spinner>
</template>

<script lang="ts">
import Spinner from "./Spinner.vue";
import RouteDebug from "./RouteDebug";
import store from "../store/index";
export default {
  components: { Spinner },
  beforeRouteEnter(to, from, next) {
    store.commit("setAppName", "マイナイミテータ");
    next("/get-auth-cert");
  },
};
</script>

<style lang="scss"></style>
