<template>
  <div class="spinner"></div>
</template>

<script lang="ts">
export default {
  name: "Spinner",
};
</script>

<style lang="scss">
@keyframes spinner {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  width: 4em;
  height: 4em;
  border: 0.5em solid #000;
  border-radius: 2em;
  border-bottom-color: rgba(0, 0, 0, 0.3);
  animation: spinner 0.8s infinite linear;
}
</style>
