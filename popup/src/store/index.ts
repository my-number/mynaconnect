import Vue from "vue";
import Vuex from "vuex";
import { Channel } from "../channel";
Vue.use(Vuex);

export default new Vuex.Store({
  state: () => ({
    commandType: "",
    appName: "",
    pin: "",
    selectedReader: null,
    sigHash: "",
    channel: new Channel(),
    modal: null,
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
    setModal(state, name) {
      state.modal = name;
    },
  },
  actions: {
    async onLoad({ state, commit }) {
      const data = await state.channel.handshake();
      commit("setCommandType", data.commandType);
      commit("setAppName", data.appName);
      data.sigHash && commit("setSigHash", data.sigHash);
    },
  },
  modules: {},
});
