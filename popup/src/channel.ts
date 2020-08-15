import { ORIGIN } from "./config";

interface ChildReady {
  type: "childReady";
}
interface ParentReady {
  type: "parentReady";
  data: {
    appName: string;
    commandType: string;
    remoteOrigin: string;
    sigHash?: string;
  };
}
interface Result {
  type: "result";
  data: {
    success: true;
    arbitraryData?: any;
  };
}
interface Message {
  type: string;
  data: object;
}

export class Channel {
  remoteOrigin = "*";
  events: { [name: string]: Array<(data: any) => void> } = {};
  constructor() {
    window.addEventListener("message", (e) => {
      if (e.origin === this.remoteOrigin || this.remoteOrigin === "*") {
        this.handleEvent(e.data);
      }
    });
  }
  private handleEvent(msg: Message) {
    this.events[msg.type]?.forEach((e: (data: any) => void) => e(msg.data));
  }
  on(typeName: string, callback: (data: any) => void) {
    if (this.events[typeName]) {
      (this.events[typeName] as Array<(data: any) => void>).push(callback);
    } else {
      this.events[typeName] = [callback];
    }
  }
  off(typeName: string, handler: (data: any) => void) {
    const evt = this.events[typeName];
    if (!evt || !evt.length) {
      return;
    }
    this.events[typeName] = evt.filter((fn) => fn == handler);
  }

  tellReady() {
    this.send("childReady");
  }
  send(typeName: string, data = {}) {
    window.opener.postMessage(
      {
        type: typeName,
        data,
      },
      this.remoteOrigin
    );
  }

  waitOnce(typeName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const handler = (data) => {
        this.off(typeName, handler);
        resolve(data);
      };
      this.on(typeName, handler);
    });
  }
  async handshake() {
    const timer = setInterval(() => this.tellReady(), 400);
    const data = await this.waitOnce("parentReady");
    clearInterval(timer);
    this.remoteOrigin = data.remoteOrigin;
    return data;
  }
  sendResult(data: any) {
    if (this.remoteOrigin === "*") {
      return;
    }
    this.send("result", data);
  }
}
