import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDataRequest } from "utils/burger-api";

interface IResposne {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}

export const getUserData = createAsyncThunk<IResposne>(
  "loginAuthSlice/getUserData",
  async () => {
    return (await getUserDataRequest()) as IResposne;
  },
);
