import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendOrderRequest } from "../../utils/burger-api.js";

export const sendOrder = createAsyncThunk(
  "orderDetailsSlice/sendOrder",
  async idArray => {
    return await sendOrderRequest(idArray);
  },
);
