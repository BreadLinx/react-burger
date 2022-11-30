import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendLoginRequest } from "../../utils/burger-api.js";

export const sendLogin = createAsyncThunk(
  "loginAuthSlice/sendLogin",
  async options => {
    return await sendLoginRequest(options);
  },
);
