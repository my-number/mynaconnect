import axios from "axios";
let id = 0;

const RPC_URL = "http://localhost:3030";
async function callRemote(method: string, params?: any[]): Promise<any> {
  id++;
  const result = await axios({
    method: "post",
    url: RPC_URL,
    timeout: 10000,
    data: {
      jsonrpc: "2.0",
      id,
      method,
      params,
    },
  });
  if (result.data.error) {
    throw result.data.error;
  }
  return result.data.result;
}

export async function getReaders() {
  return await callRemote("getReaders");
}
export async function getStatus(name: string) {
  return await callRemote("getStatus", [name]);
}
export async function getAuthCert(name: string) {
  return await callRemote("getAuthCert", [name]);
}

export async function computeAuthSig(
  name: string,
  pin: string,
  hashHex: string
) {
  return await callRemote("computeAuthSig", [name, pin, hashHex]);
}
