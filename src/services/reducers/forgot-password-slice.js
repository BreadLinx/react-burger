import { createSlice } from "@reduxjs/toolkit";
import { sendForgotPassword } from "../actions/sendForgotPassword-action.js";
import { sendResetPassword } from "../actions/sendResetPassword-action.js";

const initialState = {
  requestStatus: {
    forgotPassword: {
      request: false,
      error: false,
      errorMessage: "",
      success: false,
    },
    resetPassword: {
      request: false,
      error: false,
      errorMessage: "",
      success: false,
    },
  },
};

export const forgotPasswordSlice = createSlice({
  name: "forgotPasswordSlice",
  initialState,
  reducers: {
    resetStatuses: state => {
      state.requestStatus.forgotPassword.success = false;
      state.requestStatus.resetPassword.success = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sendForgotPassword.pending, state => {
        state.requestStatus.forgotPassword.request = true;
        state.requestStatus.forgotPassword.error = false;
        state.requestStatus.forgotPassword.success = false;
      })
      .addCase(sendForgotPassword.fulfilled, state => {
        state.requestStatus.forgotPassword.request = false;
        state.requestStatus.forgotPassword.success = true;
      })
      .addCase(sendForgotPassword.rejected, (state, action) => {
        state.requestStatus.forgotPassword.request = false;
        state.requestStatus.forgotPassword.error = true;
        state.requestStatus.forgotPassword.errorMessage = action.error.message;
      })
      .addCase(sendResetPassword.pending, state => {
        state.requestStatus.resetPassword.request = true;
        state.requestStatus.resetPassword.error = false;
        state.requestStatus.resetPassword.success = false;
      })
      .addCase(sendResetPassword.fulfilled, state => {
        state.requestStatus.resetPassword.request = false;
        state.requestStatus.resetPassword.success = true;
      })
      .addCase(sendResetPassword.rejected, (state, action) => {
        state.requestStatus.resetPassword.request = false;
        state.requestStatus.resetPassword.error = true;
        state.requestStatus.resetPassword.errorMessage = action.error.message;
      });
  },
});

export default forgotPasswordSlice.reducer;
