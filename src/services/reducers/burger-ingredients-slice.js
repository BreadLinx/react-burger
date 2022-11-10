import {createSlice} from '@reduxjs/toolkit';

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
          .addMatcher(
            action => action.type.endsWith('getIngridients/pending'),
            state => {
              state.ingredientsRequest = true;
              state.ingredientsError = false;
            }
          )
          .addMatcher(
            action => action.type.endsWith('getIngridients/fulfilled'),
            (state, action) => {
              state.ingredientsRequest = false;
              state.ingredients = action.payload;
            }
          )
          .addMatcher(
            action => action.type.endsWith('getIngridients/rejected'),
            state => {
              state.ingredientsError = true;
              state.ingredientsRequest = false;
              state.ingredients = [];
            }
          )
    },
});

export default burgerIngredientsSlice.reducer;