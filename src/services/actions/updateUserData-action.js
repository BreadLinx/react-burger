import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserDataRequest } from "../../utils/burger-api.js";

export const updateUserData = createAsyncThunk(
  "loginAuthSlice/updateUserData",
  async options => {
    return await updateUserDataRequest(options);
  },
);
