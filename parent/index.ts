const ORIGIN = "connect.mynumber.dev";

interface ChildReady {
  type: "childReady";
  success: true;
}
interface ParentReady {
  type: "parentReady";
  success: true;
  remoteOrigin: string;
  data: {
    appName: string;
  };
}
interface Result {
  type: "result";
  success: boolean;
  data: any;
}
interface Message {
  type: string;
  success: boolean;
  remoteOrigin?: string;
  data?: object;
}

export class Popup {
  target: Window | null = null;
  commandType: string = "";
  appName: string = "";
  constructor({commandType, appName}){
    this.commandType = commandType;
    this.appName = appName
  }
  open(initialValue) {
    this.target = window.open();
    await this.getChildReady();
    this.sendMessage({
      type: "parentReady",
      success: true,
      data: initialValue,
    });
  }
  getMessage(): Promise<ParentReady> {
    return new Promise((resolve, reject) => {
      const handler = (e: any) => {
        if (e.origin !== ORIGIN) {
          reject();
          return;
        }

        this.target.removeEventListener("message", handler);
        resolve(e.data);
      };
      this.target.addEventListener("message", handler);
    });
  }
  getChildReady() {
    while ((await getMessage())?.type !== "childReady") {}
  }
  getResult() {
    let result;
    while ((result = await getMessage())?.type !== "ready") {}
    return result
  }
  sendMessage(data) {
    if (!this.target) {
      return;
    }
    this.target.postMessage(data, ORIGIN);
  }
}

export async function getAuthCert() {
  const popup = new Popup({
    appName: ""
  })
}
export async function signWithAuth() {}
