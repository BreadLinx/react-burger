import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendResetPasswordRequest } from "../../utils/burger-api.js";

export const sendResetPassword = createAsyncThunk(
  "forgotPasswordSlice/sendResetPassword",
  async options => {
    return await sendResetPasswordRequest(options);
  },
);
