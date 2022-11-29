import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDataRequest } from "../../utils/burger-api.js";

export const getUserData = createAsyncThunk(
  "loginAuthSlice/getUserData",
  async () => {
    return await getUserDataRequest();
  },
);
