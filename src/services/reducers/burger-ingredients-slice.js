import {createSlice} from '@reduxjs/toolkit';
import {getIngridients} from '../actions/async-actions.js';

const initialState = {
    ingredientsRequest: false,
    ingredientsError: false,
    ingredients: [],
    tabsData: {
        currentTab: 'buns',
    }
};

export const burgerIngredientsSlice = createSlice({
    name: 'burgerIngredients',
    initialState,
    reducers: {
        setCurrentTab: (state, action) => {
            state.tabsData.currentTab = action.payload;
        },
    },
    extraReducers: {
        [getIngridients.pending]: (state) => {
            state.ingredientsRequest = true;
            state.ingredientsError = false;
        },
        [getIngridients.fulfilled]: (state, action) => {
            state.ingredientsRequest = false;
            state.ingredients = action.payload;
        },
        [getIngridients.rejected]: (state) => {
            state.ingredientsError = true;
            state.ingredientsRequest = false;
        }
    }
});

export default burgerIngredientsSlice.reducer;