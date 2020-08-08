import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    commandType: "",
    appName: "",
    pin: "",
    selectedReader: null,
    sigHash: "",
  }),
  mutations: {
    setSigHash(state, sigHash) {
      state.sigHash = sigHash;
    },
    setAppName(state, appName) {
      state.appName = appName;
    },
    setPin(state, pin) {
      state.pin = pin;
    },
    setReader(state, reader) {
      state.selectedReader = reader;
    },
    setCommandType(state, typeName) {
      state.commandType = typeName;
    },
  },
  actions: {},
  modules: {},
});
