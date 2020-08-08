<template>
  <Spinner></Spinner>
</template>

<script lang="ts">
import Spinner from "./Spinner.vue";
import RouteDebug from "./RouteDebug";
import store from "../store/index";
export default {
  components: { Spinner },
  mounted() {
    this.$store.commit("setAppName", "マイナイミテータ");
    this.$store.commit("setCommandType", "signWithAuth");
    this.$store.commit("setSigHash", Array(33).join("00"));
    this.$router.push("/sign-with-auth");
  },
};
</script>

<style lang="scss"></style>
