import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: "",
    pin: "",
  },
  mutations: {
    setAppName(state, appName) {
      state.appName = appName;
    },
    setPin(state, pin) {
      state.pin = pin;
    },
  },
  actions: {},
  modules: {},
});
