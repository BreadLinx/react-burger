import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendLoginRequest } from "utils/burger-api";

interface IOptions {
  email: string;
  password: string;
}

interface IResponse {
  accessToken: string;
  refreshToken: string;
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}

export const sendLogin = createAsyncThunk<IResponse, IOptions>(
  "loginAuthSlice/sendLogin",
  async options => {
    return (await sendLoginRequest(options)) as IResponse;
  },
);
