import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  visibility: boolean;
  message: string;
}

const initialState: IInitialState = {
  visibility: false,
  message: "",
};

export const successSlice = createSlice({
  name: "successSlice",
  initialState,
  reducers: {
    showSuccess: (state, action: PayloadAction<string>) => {
      state.visibility = true;
      state.message = action.payload;
    },
    hideSuccess: state => {
      state.visibility = false;
    },
  },
});

export default successSlice.reducer;
