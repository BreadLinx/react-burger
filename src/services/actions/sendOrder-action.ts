import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendOrderRequest } from "utils/burger-api";
import { IOrder } from "types/types";

interface IResponse {
  success: boolean;
  name: string;
  order: IOrder;
}

export const sendOrder = createAsyncThunk<IResponse, string[]>(
  "orderDetailsSlice/sendOrder",
  async idArray => {
    return (await sendOrderRequest(idArray)) as IResponse;
  },
);
