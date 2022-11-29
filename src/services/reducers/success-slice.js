import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visibility: false,
  message: "",
};

export const successSlice = createSlice({
  name: "successSlice",
  initialState,
  reducers: {
    showSuccess: (state, action) => {
      state.visibility = true;
      state.message = action.payload;
    },
    hideSuccess: state => {
      state.visibility = false;
    },
  },
});

export default successSlice.reducer;
