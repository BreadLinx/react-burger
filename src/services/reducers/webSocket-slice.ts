import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  wsConnected: boolean;
  error: boolean | undefined;
  messages: any[];
}

const initialState: IInitialState = {
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
    wsGetMessage: (state, action: PayloadAction<any>) => {
      state.error = false;
      state.messages = [...state.messages, action.payload];
    },
  },
});

export default webSocketSlice.reducer;
