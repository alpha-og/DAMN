// react imports
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
// file imports
import App from "./App.jsx";
import "./index.css";
import store from "./store/redux.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    // <React.StrictMode>
    <Router basename="/DAMN">
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
    // </React.StrictMode>
);
