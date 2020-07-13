import { useState, useContext } from "preact/hooks";
import { h, Fragment } from "preact";
import { Context } from "./Channel";
export default ({ name, children }) => {
    const channel = useContext(Context);
    if (channel.name == name) {
        return children;
    } else {
        return <Fragment />;
    }
};
