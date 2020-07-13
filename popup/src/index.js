import "./style/index.css";
import App from "./components/app.tsx";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (module.hot) {
    // tslint:disable-next-line:no-var-requires
    require("preact/debug");
}

export default App;
