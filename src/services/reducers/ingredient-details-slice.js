import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    relevantIngredient: null,
};

export const ingredientDetailsSlice = createSlice({
    name: 'ingredientDetails',
    initialState,
    reducers: {
        setRelevantIngredient: (state, action) => {
            state.relevantIngredient = action.payload;
        },
        clearRelevantIngredient: (state) => {
            state.relevantIngredient = null
        },
    }
});

export default ingredientDetailsSlice.reducer;