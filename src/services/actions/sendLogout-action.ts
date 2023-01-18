import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendLogoutRequest } from "utils/burger-api";

interface IResponse {
  success: boolean;
  message: string;
}

export const sendLogout = createAsyncThunk<IResponse>(
  "loginAuthSlice/sendLogout",
  async () => {
    return await sendLogoutRequest();
  },
);
