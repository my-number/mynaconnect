import { useState, useContext } from "preact/hooks";
import { h, createContext } from "preact";

export const Context = createContext({});
export default ({ fallback, children }) => {
  const [loaded, setLoaded] = useState(false);
  const channelObj = {
    history: [],
    go(name: string) {
      this.history.push(name);
      setLoaded(true);
    },
    back() {
      this.history.pop();
      setLoaded(!!this.history.length);
    },
    get name(): string | null {
      if (!this.history.length) return null;
      return this.history[this.history.length - 1];
    },
  };
  setTimeout(() => {
    channelObj.go("signWithAuth");
  }, 2000);
  if (!loaded) {
    return fallback;
  }
  return <Context.Provider value={channelObj}>{children}</Context.Provider>;
};

export const useChannel = () => useContext(Context);
