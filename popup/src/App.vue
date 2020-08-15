<template>
  <div id="app">
    <Container>
      <RouterView></RouterView>
    </Container>
    <Modals></Modals>
  </div>
</template>

<script lang="ts">
import Container from "./components/Container.vue";
import Modals from "./components/Modals.vue";
export default {
  components: { Container, Modals },
  mounted() {
    this.$store.dispatch("onLoad");
    this.$router.replace("/");
  },
};
</script>

<style lang="scss">
@import "./styles/index.css";
</style>
