import { ORIGIN } from "./config";

interface ChildReady {
  type: "childReady";
}
interface ParentReady {
  type: "parentReady";
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

export class Channel {
  remoteOrigin: string | null = null;
  constructor() {}
  tellReady() {
    window.opener.postMessage(
      {
        type: "childReady",
      } as ChildReady,
      "*"
    );
  }

  getMessage(): Promise<ParentReady> {
    return new Promise((resolve, reject) => {
      const handler = (e: any) => {
        if (e.origin !== ORIGIN) {
          reject();
          return;
        }

        window.removeEventListener("message", handler);
        resolve(e.data);
      };
      window.addEventListener("message", handler);
    });
  }
  async handshake() {
    this.tellReady();
    const { remoteOrigin, type, data } = await this.getMessage();
    if (type !== "parentReady") {
      return;
    }
    this.remoteOrigin = remoteOrigin;
    return data;
  }
  async sendResult(data: any) {
    if (!this.remoteOrigin) {
      return;
    }
    window.opener.postMessage(
      {
        type: "result",
        data,
      },
      this.remoteOrigin
    );
  }
}
