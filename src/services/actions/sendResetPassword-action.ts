import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendResetPasswordRequest } from "utils/burger-api";

interface IOptions {
  code: string;
  password: string;
}

interface IResponse {
  message: string;
  success: boolean;
}

export const sendResetPassword = createAsyncThunk<IResponse, IOptions>(
  "forgotPasswordSlice/sendResetPassword",
  async options => {
    return (await sendResetPasswordRequest(options)) as IResponse;
  },
);
