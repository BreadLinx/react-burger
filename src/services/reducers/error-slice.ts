import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  visibility: boolean;
  message: string;
}

const initialState: IInitialState = {
  visibility: false,
  message: "",
};

export const errorSlice = createSlice({
  name: "errorSlice",
  initialState,
  reducers: {
    showError: (state, action: PayloadAction<string>) => {
      state.visibility = true;
      state.message = action.payload;
    },
    hideError: state => {
      state.visibility = false;
    },
  },
});

export default errorSlice.reducer;
