import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendResetPasswordRequest } from "../../utils/burger-api.js";

export const sendResetPassword = createAsyncThunk(
  "forgotPasswordSlice/sendResetPassword",
  async params => {
    return await sendResetPasswordRequest(params);
  },
);
