import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserDataRequest } from "utils/burger-api";

interface IOptions {
  email: string;
  name: string;
  password: string;
}

interface IResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}

export const updateUserData = createAsyncThunk<IResponse, IOptions>(
  "loginAuthSlice/updateUserData",
  async options => {
    return (await updateUserDataRequest(options)) as IResponse;
  },
);
