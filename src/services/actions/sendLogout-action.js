import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendLogoutRequest } from "../../utils/burger-api.js";

export const sendLogout = createAsyncThunk(
  "loginAuthSlice/sendLogout",
  async () => {
    return await sendLogoutRequest();
  },
);
