import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients } from "../../utils/burger-api.js";

export const getIngridients = createAsyncThunk(
  "burgerIngredientsSlice/getIngridients",
  async () => {
    const { data } = await getIngredients();
    return data;
  },
);
