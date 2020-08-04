<template>
  <div class="select-reader">
    <div v-show="!loading">
      <back-btn inline transparent class="back-button">
        <span class="icon-arrow_back"></span>
        戻る
      </back-btn>
      <div class="title">カードリーダー設定</div>
      <div class="message" v-show="readers.length > 0">
        カードリーダーの自動設定がうまくできませんでした。 <br />
        お手数ですが使用するカードリーダーを選択してください。
      </div>
      <div class="message" v-show="readers.length == 0">
        カードリーダーが見つかりませんでした <br />
        カードリーダーを接続してください <br />
        自動的に表示されます
      </div>
      <list inset>
        <list-item
          button
          v-for="reader in readers"
          :key="reader.name"
          @click.native="selectReader(reader.name)"
        >
          <span class="icon-payment"></span>
          {{ reader.name }}
        </list-item>
        <list-item header></list-item>
        <list-item button v-show="isWebUSBAvailable">
          <span class="icon-usb"></span>
          代わりにWeb USBを使ってみる
        </list-item>
        <list-item @click.native.self="remember = !remember">
          <input type="checkbox" v-model="remember" />
          選択を記憶します
        </list-item>
      </list>
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
export default {
  data: () => ({
    readers: [],
    remember: false,
    isWebUSBAvailable: false,
    loading: true,
  }),
  components: { BackBtn, List, ListItem, Spinner },
  methods: {
    getReader() {
      return [
        {
          name: "Reader1",
        },
        {
          name: "Reader2",
        },
      ];
    },
    selectReader(i: string | null) {
      if (i === null) {
        //set autoselected reader
      } else {
        // set selected reader
      }
      this.$router.push("/insert-card");
    },
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
      Math.random() > 0.5 && this.selectReader(null);
    }, 2000);
    const readers = this.getReader();
    this.$set(this, "readers", readers);
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
    display: flex;
    justify-content: center;
  }
}
</style>
