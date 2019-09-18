import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import reducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import Welcome from "../user-authentication/welcome";
import App from "./app";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let element;
if (location.pathname == "/welcome") {
    element = <Welcome />;
} else {
    element = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(element, document.querySelector("main"));
