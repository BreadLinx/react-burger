import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wsConnected: false,
  error: false,
  messages: [],
};

export const webSocketSlice = createSlice({
  name: "webSocketSlice",
  initialState,
  reducers: {
    wsConnectionSuccess: state => {
      state.wsConnected = true;
      state.error = undefined;
    },
    wsConnectionError: state => {
      state.wsConnected = false;
      state.error = true;
    },
    wsConnectionClose: state => {
      state.wsConnected = false;
      state.error = false;
      state.messages = [];
    },
    wsGetMessage: (state, action) => {
      state.error = false;
      state.messages = [...state.messages, action.payload];
    },
  },
});

export default webSocketSlice.reducer;
