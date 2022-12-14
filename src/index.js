import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import { App } from "./components/app/app.js";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { rootReducer } from "./services/reducers/index.js";
import { BrowserRouter as Router } from "react-router-dom";
import { socketMiddleware } from "./services/middleware/socketMiddleware.js";

const appRoot = ReactDOM.createRoot(document.getElementById("app-root"));
export const modalRoot = document.getElementById("modal-root");

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(socketMiddleware),
});

appRoot.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
);
