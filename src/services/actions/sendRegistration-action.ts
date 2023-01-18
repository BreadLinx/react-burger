import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRegistrationRequest } from "utils/burger-api";

interface IOptions {
  email: string;
  name: string;
  password: string;
}
interface IResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
  };
  success: boolean;
}

export const sendRegistration = createAsyncThunk<IResponse, IOptions>(
  "loginAuthSlice/sendRegistration",
  async options => {
    return await sendRegistrationRequest(options);
  },
);
