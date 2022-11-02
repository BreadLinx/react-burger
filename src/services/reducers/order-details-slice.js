import {createSlice} from '@reduxjs/toolkit';
import {sendOrder} from '../actions/async-actions.js';

const initialState = {
    isOrderPopupOpened: false,
    orderRequest: false,
    orderError: false,
    orderData: null
};

export const orderDetailsSlice = createSlice({
    name: 'orderDetailsSlice',
    initialState,
    reducers: {
        setIsOrderPopupOpenedOnFalse: (state) => {
            state.isOrderPopupOpened = false;
        },
        setIsOrderPopupOpenedOnTrue: (state) => {
            state.isOrderPopupOpened = true;
        }
    },
    extraReducers: {
        [sendOrder.pending]: (state) => {
            state.orderRequest = true;
            state.orderError = false;
        },
        [sendOrder.fulfilled]: (state, action) => {
            state.orderRequest = false;
            state.orderData = action.payload;
        },
        [sendOrder.rejected]: (state) => {
            state.orderRequest = false;
            state.orderError = true;
        }
    }
});

export default orderDetailsSlice.reducer;