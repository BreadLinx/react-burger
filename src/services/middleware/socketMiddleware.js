import { webSocketSlice } from "../reducers/webSocket-slice.js";
import { FEED_URL, PERSONAL_FEED_URL } from "../../utils/burger-api.js";
import { getCookie } from "../../utils/cookies.js";

export const socketMiddleware = store => {
  let socket = null;
  const {
    wsConnectionSuccess,
    wsConnectionError,
    wsConnectionClose,
    wsGetMessage,
  } = webSocketSlice.actions;

  return next => action => {
    const { dispatch, getState } = store;
    const { type, payload } = action;

    if (type === "wsFeedConnectionStart") {
      socket = new WebSocket(FEED_URL);
      console.log(socket);
    }
    if (type === "wsPersonalOrdersConnectionStart") {
      socket = new WebSocket(
        `${PERSONAL_FEED_URL}?token=${getCookie("authToken")}`,
      );
    }
    if (socket) {
      socket.onopen = () => {
        dispatch(wsConnectionSuccess());
      };

      socket.onerror = () => {
        dispatch(wsConnectionError());
      };

      socket.onmessage = event => {
        const response = event.data;
        const data = JSON.parse(response);
        dispatch(wsGetMessage(data));
      };

      socket.onclose = () => {
        dispatch(wsConnectionClose());
      };

      if (type === "wsSendMessage") {
        const message = payload;
        socket.send(JSON.stringify(message));
      }

      if (type === "wsCloseConnection") {
        socket.close(1000, "CLOSE_GOING_AWAY");
      }
    }

    next(action);
  };
};
