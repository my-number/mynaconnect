import { useState } from "preact/hooks";
import { h, createContext } from "preact";
const channelObj = { name: null };
export const Context = createContext(channelObj);

export default ({ fallback, children }) => {
  const [loaded, setLoaded] = useState(false);

  setTimeout(() => {
    setLoaded(true);
    channelObj.name = "signWithAuth";
  }, 3000);

  if (!loaded) {
    return fallback;
  }
  return <Context.Provider value={channelObj}>{children}</Context.Provider>;
};
