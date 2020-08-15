<template>
  <Spinner></Spinner>
</template>

<script lang="ts">
import Spinner from "./Spinner.vue";
import store from "../store/index";

const commandRoute = {
  getAuthCert: "/get-auth-cert",
  signWithAuth: "/sign-with-auth",
  // other command is not implemented
};

export default {
  components: { Spinner },
  computed: {
    commandType() {
      return this.$store.state.commandType;
    },
  },
  watch: {
    commandType() {
      [];
      this.next();
    },
  },
  methods: {
    next() {
      if (this.commandType == "") {
        return;
      }
      const route = commandRoute[this.commandType];
      if (route) {
        this.$router.replace(route);
      } else {
        console.log("404");
        this.$router.replace("/404");
      }
    },
  },
  mounted() {
    this.next();
  },
};
</script>

<style lang="scss"></style>
