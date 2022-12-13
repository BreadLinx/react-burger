import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  totalToday: 0,
  orders: [],
};

export const userOrdersSlice = createSlice({
  name: "userOrdersSlice",
  initialState,
  reducers: {
    setOrdersData: (state, action) => {
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.orders = action.payload.orders;
    },
  },
});

export default userOrdersSlice.reducer;
