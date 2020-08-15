<template>
  <div class="auth-password">
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
      <div class="pin-remaining" v-show="pinRemaining >= 0">
        再試行可能回数は
        <span :class="{ low: pinRemaining < 3 }">{{ pinRemaining }}</span>
        回です
      </div>
    </div>
    <Keypad @submit="onSubmit" autofocus></Keypad>
  </div>
</template>

<script lang="ts">
import Keypad from "./Keypad.vue";

import Btn from "./Btn.vue";
const passwordRegex = /^[0-9]{4}$/;
export default {
  components: { Keypad, Btn },
  name: "AuthPassword",
  data() {
    return {
      pinRemaining:
        this.$store.state.selectedReader.mynumberCardInfo?.authPinRemaining ||
        -1, // -1 means no data
      more: false,
    };
  },
  methods: {
    onSubmit(pin) {
      passwordRegex.test(pin) && this.$emit("submit", pin);
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
  .pin-remaining {
    text-align: center;
    span {
      color: #377ee1;
      font-weight: bold;
      &.low {
        color: red;
      }
    }
  }
}
</style>
