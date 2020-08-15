<template>
  <div class="sign-password">
    <div class="title"><b>電子署名用パスワード</b>を入力してください</div>
    <div class="description-container">
      <btn transparent @click="more = !more">
        電子署名用パスワードとはなんですか？
        <span class="icon-expand_more" v-show="!more"></span>
        <span class="icon-expand_less" v-show="more"></span>
      </btn>
      <div class="description">
        <ul v-show="more">
          <li>6から16桁の数字または大英文字で構成されるパスワードです。</li>
          <li>
            これを入力することによって実印と同等の効果があります。
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Btn from "./Btn.vue";
export default {
  components: { Btn },
  name: "SignPassword",
  data: () => ({
    more: false,
  }),
  props: {},
  methods: {
    onSubmit(pin) {
      this.$emit("submit", pin);
    },
  },
};
</script>

<style lang="scss">
.sign-password {
  .title {
    text-align: center;
  }
  .description-container {
    display: flex;
    justify-content: center;
    margin: 10px auto;
    flex-direction: column;
  }
}
</style>
