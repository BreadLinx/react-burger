import { createSlice } from "@reduxjs/toolkit";
import { sendOrder } from "../actions/sendOrder-action.js";

const initialState = {
  orderRequest: false,
  orderError: false,
  orderData: null,
};

export const orderDetailsSlice = createSlice({
  name: "orderDetailsSlice",
  initialState,
  reducers: {
    clearOrderData: state => {
      state.orderData = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sendOrder.pending, state => {
        state.orderRequest = true;
        state.orderError = false;
      })
      .addCase(sendOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderData = action.payload;
      })
      .addCase(sendOrder.rejected, state => {
        state.orderRequest = false;
        state.orderError = true;
      });
  },
});

export default orderDetailsSlice.reducer;
