import { h } from "preact";
import Channel from "./Channel";
import Loader from "./Loader";
import Switch from "./Switch";
import SignWithAuth from "./SignWithAuth";
const App = () => {
    return (
        <div id="app">
            <Channel fallback={<Loader />}>
                <Switch name="getAuthCert">getAuthCert!!</Switch>
                <Switch name="getSignCert" />
                <Switch name="signWithAuth">
                    <SignWithAuth />
                </Switch>
                <Switch name="signWithSign" />
                <Switch name="chooseReader" />
            </Channel>
        </div>
    );
};

export default App;
