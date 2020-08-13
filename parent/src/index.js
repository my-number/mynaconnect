const ORIGIN =
  localStorage.dev != "yes"
    ? "https://connect.mynumber.dev"
    : "http://localhost:8080";
export class Popup {
  constructor({ appName }) {
    this.target = "";
    this.appName = appName;
    this.commandType = "";
  }
  async open(commandType, data) {
    this.target = window.open(ORIGIN);
    await this.getChildReady();
    this.sendMessage({
      type: "parentReady",
      success: true,
      data: {
        appName: this.appName,
        commandType,
        ...data,
      },
    });
  }
  getMessage(typeName) {
    return new Promise((resolve, reject) => {
      const handler = (e) => {
        if (e.origin === ORIGIN && e.data.type == typeName) {
          this.target.removeEventListener("message", handler);
          resolve(e.data);
        }
      };
      this.target.addEventListener("message", handler);
    });
  }
  async getChildReady() {
    return await this.getMessage("childReady");
  }
  async getResult() {
    return await this.getMessage("result");
  }
  sendMessage(data) {
    if (!this.target) {
      return;
    }
    this.target.postMessage(data, ORIGIN);
  }
}
window.mynaconnect = {
  Popup,
};
