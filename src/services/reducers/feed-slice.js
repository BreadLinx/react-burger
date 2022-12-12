import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  totalToday: 0,
  orders: [],
};

export const feedSlice = createSlice({
  name: "feedSlice",
  initialState,
  reducers: {
    setFeedData: (state, action) => {
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      state.orders = action.payload.orders;
    },
  },
});

export default feedSlice.reducer;
