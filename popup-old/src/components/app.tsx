import { h } from "preact";
import Channel from "./Channel";
import Loader from "./Loader";
import Pages from "./Pages";
import Page from "./Page";
import SignWithAuth from "./SignWithAuth";
import AuthPassword from "./AuthPassword";
const App = () => {
  return (
    <div id="app">
      <AuthPassword />
    </div>
  );
};

export default App;
