import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    orderRequest: false,
    orderError: false,
    orderData: null
};

export const orderDetailsSlice = createSlice({
    name: 'orderDetailsSlice',
    initialState,
    reducers: {
        clearOrderData: (state) => {
            state.orderData = null;
        },
    },
    extraReducers: (builder) => {
      builder
        .addMatcher(
          action => action.type.endsWith('sendOrder/pending'),
          state => {
            state.orderRequest = true;
            state.orderError = false;
          }
        )
        .addMatcher(
          action => action.type.endsWith('sendOrder/fulfilled'),
          (state, action) => {
            state.orderRequest = false;
            state.orderData = action.payload;
          }
        )
        .addMatcher(
          action => action.type.endsWith('sendOrder/rejected'),
          state => {
            state.orderRequest = false;
            state.orderError = true;
          }
        )
    },
});

export default orderDetailsSlice.reducer;