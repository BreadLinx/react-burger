import {createSlice} from '@reduxjs/toolkit';
import {getIngridients} from '../actions/getIngridients-action.js';

const initialState = {
    ingredientsRequest: false,
    ingredientsError: false,
    ingredients: [],
};

export const burgerIngredientsSlice = createSlice({
    name: 'burgerIngredients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(getIngridients.pending, state => {
            state.ingredientsRequest = true;
            state.ingredientsError = false;
          })
          .addCase(getIngridients.fulfilled, (state, action) => {
            state.ingredientsRequest = false;
            state.ingredients = action.payload;
          })
          .addCase(getIngridients.rejected, state => {
            state.ingredientsError = true;
            state.ingredientsRequest = false;
            state.ingredients = [];
          })
    },
});

export default burgerIngredientsSlice.reducer;