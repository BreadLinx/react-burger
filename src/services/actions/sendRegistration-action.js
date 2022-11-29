import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendRegistrationRequest } from "../../utils/burger-api.js";

export const sendRegistration = createAsyncThunk(
  "loginAuthSlice/sendRegistration",
  async ({ nameValue, emailValue, passwordValue }) => {
    return await sendRegistrationRequest(nameValue, emailValue, passwordValue);
  },
);
