<template>
  <div id="app">
    <Container>
      <RouterView></RouterView>
    </Container>
  </div>
</template>

<script lang="ts">
import Container from "./components/Container.vue";
export default {
  components: { Container },
  mounted() {
    this.$store.dispatch("onLoad");
    this.$router.replace("/");
  },
};
</script>

<style lang="scss">
@import "./styles/index.css";
</style>
