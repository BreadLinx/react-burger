import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "types/types";

interface IInitialState {
  total: number;
  totalToday: number;
  orders: IOrder[];
}

const initialState: IInitialState = {
  total: 0,
  totalToday: 0,
  orders: [],
};

export const feedSlice = createSlice({
  name: "feedSlice",
  initialState,
  reducers: {
    setFeedData: (
      state,
      action: PayloadAction<{
        total: number;
        totalToday: number;
        orders: IOrder[];
      }>,
    ) => {
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.orders = action.payload.orders;
    },
  },
});

export default feedSlice.reducer;
