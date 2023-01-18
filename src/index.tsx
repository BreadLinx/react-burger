import "./index.css";
import ReactDOM from "react-dom/client";
import React from "react";
import { App } from "components/app/app";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { rootReducer } from "services/reducers";
import { BrowserRouter as Router } from "react-router-dom";
import { socketMiddleware } from "services/middleware/socketMiddleware";

const appRoot = ReactDOM.createRoot(
  document.getElementById("app-root") as HTMLElement,
);
export const modalRoot = document.getElementById("modal-root") as HTMLElement;

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(socketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

appRoot.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
);
