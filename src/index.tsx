import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"
import {store} from "./redux/store"
import Home from "./pages/Home";
import "./assets/main.css";

const container = document.getElementById("app-root")!;
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <Home/>
    </Provider>

);