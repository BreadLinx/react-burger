import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    relevantIngredient: null,
    isPopupOpened: false
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
        setIsPopupOpenedOnFalse: (state) => {
            state.isPopupOpened = false;
        },
        setIsPopupOpenedOnTrue: (state) => {
            state.isPopupOpened = true;
        },
    }
});

export default ingredientDetailsSlice.reducer;