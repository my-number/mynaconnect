<template>
  <div class="auth-password">
    <BackBtn />
    <div class="title"><b>利用者証明用PIN</b>を入力してください</div>
    <div class="description-container">
      <btn transparent @click="more = !more">
        利用者証明用PINとはなんですか？
        <span class="icon-expand_more" v-show="!more"></span>
        <span class="icon-expand_less" v-show="more"></span>
      </btn>
      <div class="description">
        <ul v-show="more">
          <li>4桁の数字です。</li>
          <li>
            操作しているのが本当にあなたであることを証明するためのPINです。
          </li>
          <li>
            券面事項入力補助用PIN、住民基本台帳用PINとは
            <b>異なります</b
            ><br />(とはいえ多くの方は全て同じPINを設定していると思われます)
          </li>
        </ul>
      </div>
    </div>
    <keypad @submit="next"></keypad>
  </div>
</template>

<script lang="ts">
import Keypad from "./Keypad.vue";

import Btn from "./Btn";
import BackBtn from "./BackBtn";
export default {
  components: { Keypad, BackBtn, Btn },
  name: "AuthPassword",
  data: () => ({
    more: false,
  }),
  props: {},
  methods: {
    next(pin) {
      this.$store.commit("setPin", pin);
      this.$router.push("/select-reader");
    },
  },
};
</script>

<style lang="scss">
.auth-password {
  .title {
    text-align: center;
  }
  .description-container {
    display: flex;
    justify-content: center;
    margin: 10px auto;
    flex-direction: column;
  }
  .back-button {
    svg {
      fill: #377ee1;
    }
  }
}
</style>
