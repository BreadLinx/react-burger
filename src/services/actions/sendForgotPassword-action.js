import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendForgotPasswordRequest } from "../../utils/burger-api.js";

export const sendForgotPassword = createAsyncThunk(
  "forgotPasswordSlice/sendForgotPassword",
  async email => {
    return await sendForgotPasswordRequest(email);
  },
);
