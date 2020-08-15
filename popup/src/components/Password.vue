<template>
  <div class="password">
    <BackBtn />
    <AuthPassword v-show="commandType == 'signWithAuth'" @submit="next" />
    <SignPassword
      v-show="commandType == 'signWithSign' || commandType == 'getSignCert'"
      @submit="next"
    />
  </div>
</template>

<script lang="ts">
import AuthPassword from "./AuthPassword.vue";
import SignPassword from "./SignPassword.vue";
import BackBtn from "./BackBtn.vue";
export default {
  components: { AuthPassword, BackBtn, SignPassword },
  name: "Password",
  computed: {
    commandType() {
      return this.$store.state.commandType;
    },
  },
  props: {},
  methods: {
    next(pin) {
      this.$store.commit("setPin", pin);
      this.$router.push("/insert-card");
    },
  },
};
</script>

<style lang="scss"></style>
