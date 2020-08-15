<template>
  <div class="select-reader">
    <div v-show="!loading">
      <back-btn inline transparent class="back-button">
        <span class="icon-arrow_back"></span>
        戻る
      </back-btn>
      <div class="title">カードリーダー設定</div>
      <div class="message" v-show="readers.length > 0 && !error">
        カードリーダーの自動設定がうまくできませんでした。 <br />
        お手数ですが使用するカードリーダーを選択してください。
      </div>
      <div class="message" v-show="readers.length == 0 && !error">
        カードリーダーが見つかりませんでした <br />
        カードリーダーを接続してください <br />
        自動的に表示されます
      </div>

      <div class="message" v-show="error">
        デーモンと通信できません。
        <br />
        デーモンをインストールし、起動してください。
        <br />
        起動が完了したら自動的に表示されます。
        <btn transparent>インストールページへ</btn>
      </div>

      <list inset v-show="readers.length > 0">
        <list-item
          button
          v-for="reader in readers"
          :key="reader.name"
          @click.native="selectReader(reader)"
          icon="icon-payment"
        >
          <div class="name">{{ reader.name }}</div>
          <div class="statuses">
            <span
              class="status mynumber-card"
              v-show="!!reader.mynumberCardInfo"
            >
              マイナンバーカードあり
            </span>
            <span class="status no-card" v-show="isNoCard(reader.error)">
              カード未挿入
            </span>
            <span
              class="status sharing-violation"
              v-show="isSharingViolation(reader.error)"
            >
              別のプロセスが利用中
            </span>
            <span class="status error" v-show="isFatalError(reader.error)">
              エラーあり
            </span>
          </div>
        </list-item>
      </list>
      <list inset v-show="isWebUSBAvailable">
        <list-item button icon="icon-usb">
          代わりにWeb USBを使ってみる
        </list-item>
        ></list
      >
    </div>

    <div class="loading" v-show="loading">
      <Spinner />
    </div>
  </div>
</template>

<script lang="ts">
import BackBtn from "./BackBtn.vue";
import List from "./List.vue";
import Spinner from "./Spinner.vue";
import ListItem from "./ListItem.vue";
import Btn from "./Btn";

import { getReaders } from "../rpc";
import * as pcscConst from "../utils/pcsc-consts";
const INTERVAL = 2000;

export default {
  data: () => ({
    readers: [],
    remember: false,
    isWebUSBAvailable: false,
    loading: true,
    timerId: null,
    error: false,
  }),
  components: { BackBtn, List, ListItem, Spinner, Btn },
  methods: {
    async getReader() {
      try {
        const readers = await getReaders();
        this.error = false;
        this.$set(this, "readers", readers);
        const autoselectable = readers.filter((reader) => !reader.error);
        if (autoselectable.length > 1) {
          this.selectReader(autoselectable[0]);
        }
      } catch (e) {
        this.error = true;

        this.$set(this, "readers", []);
        console.error("getReader Error", e);
      }
      this.loading = false;
    },
    selectReader(reader) {
      this.$store.commit("setReader", reader);
      const commandType = this.$store.state.commandType;
      switch (commandType) {
        case "signWithAuth":
        case "signWithSign":
        case "getSignCert":
          this.$router.push("/password");
          break;
        default:
          this.$router.push("/insert-card");
      }
    },
    isNoCard(errcode: number) {
      return errcode == pcscConst.SCARD_E_NO_SMARTCARD;
    },
    isSharingViolation(errcode: number) {
      return errcode == pcscConst.SCARD_E_SHARING_VIOLATION;
    },
    isFatalError(errcode: number) {
      return !!~[
        pcscConst.SCARD_E_UNKNOWN_CARD,
        pcscConst.SCARD_E_READER_UNAVAILABLE,
        pcscConst.SCARD_F_UNKNOWN_ERROR,
        pcscConst.SCARD_E_NOT_READY,
        pcscConst.SCARD_E_NO_ACCESS,
        pcscConst.SCARD_W_UNRESPONSIVE_CARD,
        pcscConst.SCARD_W_UNSUPPORTED_CARD,
      ].indexOf(errcode);
    },
  },
  mounted() {
    this.timer = setInterval(this.getReader, INTERVAL);
    this.getReader();
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style lang="scss">
.select-reader {
  .title {
    font-size: 1.3em;
    text-align: center;
  }
  .message {
    /*display: flex;
    justify-content: center;*/
  }
  .statuses .status {
    color: #999;
    font-size: 0.85em;
    margin: 2px;
  }
}
</style>
