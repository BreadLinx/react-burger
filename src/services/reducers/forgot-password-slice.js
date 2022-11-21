import {createSlice} from '@reduxjs/toolkit';
import {sendForgotPassword} from '../actions/sendForgotPassword-action.js';
import {sendResetPassword} from '../actions/sendResetPassword-action.js';

const initialState = {
    forgotPasswordRequest: false,
    forgotPasswordError: false,
    forgotPasswordSuccess: false,
    resetPasswordRequest: false,
    resetPasswordError: false,
    resetPasswordSuccess: false,
};

export const forgotPasswordSlice = createSlice({
    name: 'forgotPassword',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(sendForgotPassword.pending, state => {
          state.forgotPasswordRequest = true;
          state.forgotPasswordError = false;
          state.forgotPasswordSuccess = false;
        })
        .addCase(sendForgotPassword.fulfilled, state => {
          state.forgotPasswordRequest = false;
          state.forgotPasswordSuccess = true;
        })
        .addCase(sendForgotPassword.rejected, state => {
          state.forgotPasswordRequest = false;
          state.forgotPasswordError = true;
        })
        .addCase(sendResetPassword.pending, state => {
          state.resetPasswordRequest = true;
          state.resetPasswordError = false;
          state.resetPasswordSuccess = false;
        })
        .addCase(sendResetPassword.fulfilled, state => {
          state.resetPasswordRequest = false;
          state.resetPasswordSuccess = true;
        })
        .addCase(sendResetPassword.rejected, state => {
          state.resetPasswordRequest = false;
          state.resetPasswordError = true;
        })
    },
});

export default forgotPasswordSlice.reducer;