import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibility: false,
  message: "",
};

export const errorSlice = createSlice({
  name: "errorSlice",
  initialState,
  reducers: {
    showError: (state, action) => {
      state.visibility = true;
      state.message = action.payload;
    },
    hideError: state => {
      state.visibility = false;
    },
  },
});

export default errorSlice.reducer;
