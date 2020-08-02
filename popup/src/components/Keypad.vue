<template>
  <div class="keypad">
    <div class="inputbox">
      <input
        type="text"
        pattern="^[0-9]{0,4}$"
        v-model="value"
        @keydown="keyboardInput"
      />
    </div>
    <div class="pads">
      <div class="row">
        <div class="col left" @click="put(1)">{{ pads[1] }}</div>
        <div class="col center" @click="put(2)">{{ pads[2] }}</div>
        <div class="col right" @click="put(3)">{{ pads[3] }}</div>
      </div>
      <div class="row">
        <div class="col left" @click="put(4)">{{ pads[4] }}</div>
        <div class="col center" @click="put(5)">{{ pads[5] }}</div>
        <div class="col right" @click="put(6)">{{ pads[6] }}</div>
      </div>
      <div class="row">
        <div class="col left" @click="put(7)">{{ pads[7] }}</div>
        <div class="col center" @click="put(8)">{{ pads[8] }}</div>
        <div class="col right" @click="put(9)">{{ pads[9] }}</div>
      </div>
      <div class="row">
        <div class="col left" v-if="!value.length" @click="shuffle">
          <span class="icon-shuffle"></span>
        </div>
        <div class="col left" v-if="value.length" @click="backspace">
          <span class="icon-backspace"></span>
        </div>
        <div class="col center" @click="put(0)">{{ pads[0] }}</div>
        <div
          class="col right next"
          :class="{ disabled: !value.length }"
          @click="submit"
        >
          <span class="icon-arrow_forward"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      value: "",
      pads: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    };
  },
  methods: {
    shuffle() {
      const pads = this.pads;
      for (let i = 0; i < pads.length - 1; i++) {
        const tmp = pads[i];
        const rnd = i + 1 + Math.floor(Math.random() * (pads.length - 1 - i));
        pads[i] = pads[rnd];
        pads[rnd] = tmp;
      }
      this.$set(this, "pads", []);
      this.$set(this, "pads", pads);
    },
    backspace() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    put(i: number) {
      if (this.value.length >= 4) return;
      this.value += this.pads[i].toString();
    },
    submit() {
      if (this.value.length == 0) {
        return;
      }
      this.$emit("submit", this.value);
    },
    keyboardInput(e) {
      const key = e.keyCode || e.which;
      if ((key < 48 || key > 57 || this.value.length >= 4) && key != 8) {
        e.preventDefault();
      }
      if (key == 13) {
        this.submit();
      }
    },
  },
});
</script>
<style lang="scss">
$input-height: 80px;
$key-height: 100px;
.keypad {
  max-width: 400px;
  margin: auto;
}
.inputbox {
  width: 100%;
  height: $input-height;
  input {
    display: block;
    width: 100%;
    height: 100%;
    text-align: center;
    border: none;
    line-height: $input-height;
    font-size: $input-height;
  }
}
.pads {
  .row {
    display: -ms-grid;
    display: grid;
    width: 100%;

    -ms-grid-columns: 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;

    .col {
      display: block;
      height: $key-height;
      line-height: $key-height;
      text-align: center;
      margin: 1px;
      background-color: #ddd;
      font-size: 2em;
      font-weight: bold;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      &:active {
        background-color: #bbb;
      }
      &.next {
        background-color: #377ee1;
        color: white;
        &:active {
          background-color: darken(#377ee1, 20%);
        }
      }
      &.disabled {
        background-color: #bbb;
      }
      &.left {
        -ms-grid-column: 1;
      }
      &.center {
        -ms-grid-column: 2;
      }
      &.right {
        -ms-grid-column: 3;
      }
    }
  }
}
</style>
