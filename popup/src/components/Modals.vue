<template>
  <div id="modals" :class="{ show: showing }">
    <div class="ok modal" :class="{ show: showing == 'ok' }">
      <div class="icon">
        <span class="icon-done"></span>
      </div>
      <div class="title">読み取りに成功しました！</div>
      <div class="description">
        まもなくアプリケーションに戻ります。
      </div>
    </div>
    <div
      class="pin-incorrect modal"
      :class="{ show: showing == 'pin-incorrect' }"
    >
      <div class="icon">
        <span class="icon-error_outline"></span>
      </div>
      <div v-show="count > 0">
        <div class="title">{{ pinOrPassword }}が間違っています</div>
        <div class="description">
          もう一度、正しい{{ pinOrPassword }}を入力してください。 <br />
          残りの再試行回数は <span class="count">{{ count }}</span> 回です
        </div>
        <div class="action">
          <Btn @click="back">パスワード入力画面へ</Btn>
        </div>
      </div>
      <div v-show="count == 0">
        <div class="title">カードが<b>ロック</b>されました</div>
        <div class="description">
          住民票がある市区町村の窓口にて、パスワードの再設定手続を行ってください。
        </div>
        <div class="action">
          <Btn caution @click="exitWithError">終了する</Btn>
        </div>
      </div>
    </div>
    <div class="error modal" :class="{ show: showing == 'error' }">
      <div class="icon">
        <span class="icon-sentiment_dissatisfied"></span>
      </div>
      <div class="title">エラーが発生しました</div>
      <div class="description">
        以下の原因が考えられます
        <ul>
          <li>カードがうまく挿入されていない</li>
          <li>カードリーダーが対応していない</li>
          <li>誤ったカードリーダー/モードを選択している</li>
          <li>別のアプリケーションが利用している</li>
          <li>マイナンバーカードが故障している</li>
        </ul>
      </div>
      <div class="action">
        <Btn caution @click="exitWithError">終了する</Btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Btn from "./Btn.vue";
export default {
  components: { Btn },
  computed: {
    showing() {
      return this.$store.state.modal;
    },
    pinOrPassword() {
      const reader = this.$store.state.selectedReader;
      const commandType = this.$store.state.commandType;
      if (commandType === "signWithAuth") {
        return "PIN";
      } else if (commandType === "signWithSign") {
        return "パスワード";
      }
      return "は？";
    },
    count() {
      const reader = this.$store.state.selectedReader || {};
      const commandType = this.$store.state.commandType;
      if (commandType === "signWithAuth") {
        return reader.mynumberCardInfo?.authPinRemaining;
      } else if (commandType === "signWithSign") {
        return reader.mynumberCardInfo?.signPinRemaining;
      }
      return 114514;
    },
  },
  methods: {
    exitWithError() {
      this.$store.state.channel.sendResult({
        success: false,
        error: true,
      });
    },
    back() {
      this.$store.commit("setModal", null);
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
$radius: 22px;
#modals {
  display: none;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  &.show {
    display: flex;
    background-color: rgba(0, 0, 0, 0.45);
  }
  .modal {
    background-color: white;
    border-radius: $radius;

    justify-content: center;
    display: none;
    padding: $radius;
    &.show {
      display: block;
      transform: none;
      opacity: 1;
    }
    .icon {
      width: 100px;
      line-height: 100px;
      font-size: 100px;
      margin: auto;
    }
    .title {
      text-align: center;
      font-weight: bold;
      margin: 0.5rem;
    }
    .description {
      text-align: center;
      ul {
        text-align: left;
      }
    }
    .count {
      color: red;
      font-weight: bold;
    }
  }
}
</style>
