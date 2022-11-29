import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserDataRequest } from "../../utils/burger-api.js";

export const updateUserData = createAsyncThunk(
  "loginAuthSlice/updateUserData",
  async ({ name, email, password }) => {
    return await updateUserDataRequest({ name, email, password });
  },
);
