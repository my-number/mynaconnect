<template>
  <div class="confirm-password">
    <btn inline transparent class="back-button">
      <span class="icon-arrow_back"></span>
      戻る
    </btn>
    <div class="title"><b>利用者証明用PIN</b>を入力してください</div>
    <div class="description-container">
      <div class="description">
        利用者証明用PINとはなんですか？
        <ul>
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
  </div>
</template>

<script lang="ts">
import Btn from "./Btn.vue";
export default {
  components: { Btn },
  name: "ConfirmPassword",
  props: {},
};
</script>

<style lang="scss" module>
.auth-password {
  .title {
    text-align: center;
  }
  .description-container {
    display: flex;
    justify-content: center;
    margin: 10px auto;
  }
}
</style>
