import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRegistrationRequest } from "../../utils/burger-api.js";

export const sendRegistration = createAsyncThunk(
  "loginAuthSlice/sendRegistration",
  async options => {
    return await sendRegistrationRequest(options);
  },
);
