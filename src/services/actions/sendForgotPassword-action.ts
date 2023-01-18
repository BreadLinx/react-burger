import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendForgotPasswordRequest } from "utils/burger-api";

interface IResponse {
  success: boolean;
  message: string;
}

export const sendForgotPassword = createAsyncThunk<IResponse, string>(
  "forgotPasswordSlice/sendForgotPassword",
  async email => {
    return await sendForgotPasswordRequest(email);
  },
);
