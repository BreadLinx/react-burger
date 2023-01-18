import { AnyAction, Dispatch } from "redux";
import { webSocketSlice } from "services/reducers/webSocket-slice";
import { FEED_URL, PERSONAL_FEED_URL } from "utils/burger-api";
import { getCookie } from "utils/cookies";
import { SUCCESSFUL_CLOSURE_CODE } from "utils/webSocket-codes";

export const socketMiddleware = (store: { dispatch: any; getState: any }) => {
  let socket: WebSocket | null = null;
  const {
    wsConnectionSuccess,
    wsConnectionError,
    wsConnectionClose,
    wsGetMessage,
  } = webSocketSlice.actions;

  return (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    const { dispatch } = store;
    const { type, payload } = action;

    if (type === "wsFeedConnectionStart") {
      socket = new WebSocket(FEED_URL);
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
        socket.close(SUCCESSFUL_CLOSURE_CODE, "CLOSE_GOING_AWAY");
      }
    }

    next(action);
  };
};
