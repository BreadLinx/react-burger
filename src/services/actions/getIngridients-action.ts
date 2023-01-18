import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients } from "utils/burger-api";
import { ICard } from "types/types";

export const getIngridients = createAsyncThunk<ICard[]>(
  "burgerIngredientsSlice/getIngridients",
  async () => {
    const { data } = await getIngredients();
    return data;
  },
);
