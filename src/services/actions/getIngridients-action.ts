import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredients } from "utils/burger-api";
import { ICard } from "types/types";

interface IResposne {
  success: boolean;
  data: ICard[];
}

export const getIngridients = createAsyncThunk<IResposne>(
  "burgerIngredientsSlice/getIngridients",
  async () => {
    return (await getIngredients()) as IResposne;
  },
);
