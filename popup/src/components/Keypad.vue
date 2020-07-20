<template>
<div class="keypad">
  <div class="inputbox">
    <input type="text" pattern="[^0-9]{0,4}" v-model="pin" @keydown="keyboardInput"/>
  </div>
  <div class="pads">
    <div class="row">
      <div class="col" @click="put(1)">{{pads[1]}}</div>
      <div class="col" @click="put(2)">{{pads[2]}}</div>
      <div class="col" @click="put(3)">{{pads[3]}}</div>
    </div>
    <div class="row">
      <div class="col" @click="put(4)">{{pads[4]}}</div>
      <div class="col" @click="put(5)">{{pads[5]}}</div>
      <div class="col" @click="put(6)">{{pads[6]}}</div>
    </div>
    <div class="row">
      <div class="col" @click="put(7)">{{pads[7]}}</div>
      <div class="col" @click="put(8)">{{pads[8]}}</div>
      <div class="col" @click="put(9)">{{pads[9]}}</div>
    </div>
    <div class="row">
      <div class="col" v-if="!pin.length" @click="shuffle">shuf</div>
      <div class="col"  v-if="pin.length" @click="backspace">bksp</div>
      <div class="col" @click="put(0)">{{pads[0]}}</div>
      <div :class="{col: true, next: true, disabled: !!pin.length}" >next</div>
</div>
  </div>
</div>
</template>
<script lang="ts">
  import Vue from "vue";
  export default Vue.extend({
    data() {
      return {
        pin: "",
        pads: [0,1,2,3,4,5,6,7,8,9],
        _reactive:0
      }
    },
    methods: {
      shuffle(){
        this._reactive++
        const pads = this.pads;
        for(let i = 0; i<pads.length-1; i++){
          const tmp = pads[i];
          const rnd = i + 1 + Math.floor(Math.random() * (pads.length - 1 - i));
          pads[i] = pads[rnd];
          pads[rnd] = tmp;
        }
        this.$set(this,"pads", [])
        this.$set(this,"pads", pads)
        
        
      },
      backspace(){
        this.pin = this.pin.slice(0,this.pin.length-1)
      },
      put(i: number){
        if(this.pin.length>=4)return
        this.pin += this.pads[i].toString()
      },
      keyboardInput(e){
        var key = e.keyCode || e.which;
        if ((key < 48 || key > 57 || this.pin.length>=4) && key != 8 ) { 
          e.preventDefault(); 
        }
      }
    }
  })
</script>
<style lang="scss" module>
$input-height: 80px;
$key-height: 100px;
.keypad{
    max-width: 400px;
    margin: auto;
}
.inputbox{
    width: 100%;
    height: $input-height;
    input{
        display: block;
        width: 100%;
        height: 100%;
        text-align: center;
        border: none;
        line-height: $input-height;
        font-size: $input-height;
    }
}
.pads{
    .row{
        display: grid;
        width: 100%;
        
        grid-template-columns: 1fr 1fr 1fr;
        .col{
            height: $key-height;
            line-height: $key-height;
            text-align: center;
            margin: 1px;
            background-color: #ddd;
            font-size: 2em;
            font-weight: bold;
            user-select: none;
            &:active{
                background-color: #bbb;
            }
            &.next{
                background-color: #377ee1;
                color: white;
                &:active{
                    background-color: darken(#377ee1,20%);
                }
            }
        }
    }
    
}
</style>
