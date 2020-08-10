<template>
  <div class="insert-card">
    <BackBtn></BackBtn>
    <div class="title"><b>マイナンバーカード</b>を読み取ります</div>
    <div class="description-container">
      カードをカードリーダーに挿入してください。
      <br />
      非接触式リーダーをご利用の方はカードをタッチしてください。
    </div>
  </div>
</template>

<script lang="ts">
import BackBtn from "./BackBtn.vue";
import { computeAuthSig, getAuthCert } from "../rpc";
import { SCARD_E_NO_SMARTCARD } from "../utils/pcsc-consts";

const INTERVAL = 1500;
export default {
  components: { BackBtn },
  name: "InsertCard",
  data: () => ({ timerEnabled: false, timer: null }),
  methods: {
    async execute() {
      const state = this.$store.state;
      switch (state.commandType) {
        case "signWithAuth":
          return await computeAuthSig(
            state.selectedReader.name,
            state.pin,
            state.sigHash
          );
        case "getSignCert":
          return await getAuthCert(state.selectedReader.name);
        default:
          throw new Error("Unimplemented");
      }
    },
    async _execute() {
      if (!this.timerEnabled) {
        return;
      }
      try {
        const result = await this.execute();
        this.timerEnabled = false;
        console.log(result);
      } catch (e) {
        if (e.data == SCARD_E_NO_SMARTCARD) {
          setTimeout(this._execute, INTERVAL);
          return;
        }
        this.timerEnabled = false;
        this.handleError(e);
      }
    },
    handleError(e) {
      console.error(e);
      alert("エラーが発生しました。");
    },
  },
  mounted() {
    this.timerEnabled = true;
    this._execute();
  },
  beforeDestroy() {
    setTimeout(this._execute, INTERVAL);
  },
};
</script>

<style lang="scss">
.title {
  text-align: center;
}
.description-container {
  display: flex;
  justify-content: center;
  margin: 10px auto;
  flex-direction: column;
}
</style>
