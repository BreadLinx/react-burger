import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getIngridients } from "services/actions/getIngridients-action";
import { ICard } from "types/types";

interface IInitialState {
  ingredientsRequest: boolean;
  ingredientsError: boolean;
  ingredients: ICard[];
}

const initialState: IInitialState = {
  ingredientsRequest: false,
  ingredientsError: false,
  ingredients: [],
};

export const burgerIngredientsSlice = createSlice({
  name: "burgerIngredientsSlice",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getIngridients.pending, state => {
        state.ingredientsRequest = true;
        state.ingredientsError = false;
      })
      .addCase(
        getIngridients.fulfilled,
        (state, action: PayloadAction<ICard[]>) => {
          state.ingredientsRequest = false;
          state.ingredients = action.payload;
        },
      )
      .addCase(getIngridients.rejected, state => {
        state.ingredientsError = true;
        state.ingredientsRequest = false;
        state.ingredients = [];
      });
  },
});

export default burgerIngredientsSlice.reducer;
