import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { sendOrder } from "services/actions/sendOrder-action";
import { IOrder } from "types/types";

interface IInitialState {
  orderRequest: boolean;
  orderError: boolean;
  orderData: { name: string; success: boolean; order: IOrder } | null;
}

const initialState: IInitialState = {
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
        console.log(action.payload);
        state.orderData = action.payload;
      })
      .addCase(sendOrder.rejected, state => {
        state.orderRequest = false;
        state.orderError = true;
      });
  },
});

export default orderDetailsSlice.reducer;
