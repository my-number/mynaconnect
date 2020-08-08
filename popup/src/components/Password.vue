<template>
  <div class="password">
    <BackBtn />
    <AuthPassword @submit="next" />
    <SignPassword v-show="false" @submit="next" />
  </div>
</template>

<script lang="ts">
import AuthPassword from "./AuthPassword.vue";
import SignPassword from "./SignPassword.vue";
import BackBtn from "./BackBtn.vue";
export default {
  components: { AuthPassword, BackBtn, SignPassword },
  name: "Password",
  data: () => ({}),
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
