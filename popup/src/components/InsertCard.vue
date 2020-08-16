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

const INTERVAL = 1000;
export default {
  components: { BackBtn },
  name: "InsertCard",
  data: () => ({ timerEnabled: false, timer: null }),
  methods: {
    execute() {
      const state = this.$store.state;
      switch (state.commandType) {
        case "signWithAuth":
          return computeAuthSig(
            state.selectedReader.name,
            state.pin,
            state.sigHash
          );
        case "getAuthCert":
          return getAuthCert(state.selectedReader.name);
        default:
          Promise.reject(new Error("Unimplemented"));
      }
    },
    _execute() {
      if (!this.timerEnabled) {
        return;
      }

      return this.execute()
        .then((result) => {
          this.timerEnabled = false;
          this.handleSuccess(result);
        })
        .catch((e) => {
          if (e.data == SCARD_E_NO_SMARTCARD) {
            setTimeout(this._execute, INTERVAL);
            return;
          }
          this.timerEnabled = false;
          this.handleError(e);
        });
    },
    handleError(e) {
      if (e.code == -4) {
        const count = e.data;
        const reader = this.$store.state.selectedReader;
        if (!reader.mynumberCardInfo) {
          reader.mynumberCardInfo = {};
        }
        const commandType = this.$store.state.commandType;
        if (commandType === "signWithAuth") {
          // auth pin retry
          reader.mynumberCardInfo.authPinRemaining = count;
        } else if (commandType === "signWithSign") {
          // sign pin retry
          reader.mynumberCardInfo.signPinRemaining = count;
        }

        this.$store.commit("setReader", reader);
        this.$store.commit("setModal", "pin-incorrect");
        return;
      }
      console.error(e);
      this.$store.commit("setModal", "error");
    },
    handleSuccess(data) {
      this.$store.commit("setModal", "ok");
      setTimeout(() => {
        this.$store.state.channel.sendResult({
          success: true,
          ...data,
        });
      }, 3000);
    },
  },
  mounted() {
    this.timerEnabled = true;
    this._execute();
  },
  beforeDestroy() {
    this.timerEnabled = false;
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
