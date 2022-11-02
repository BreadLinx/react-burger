import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    burgerStructure: {
        bun: null,
        ingredients: []
    },
    burgerStructureInId: []
};

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        addIngredient: (state, action) => {
            if(action.payload.type === 'bun') {
                state.burgerStructure.bun = action.payload;
                return;
            }
            if(state.burgerStructure.bun) {
                state.burgerStructure.ingredients.push(action.payload);
            }
        },
        setBurgerStructureInId: (state, action) => {
            state.burgerStructureInId = action.payload;
        },
        deleteIngredient: (state, action) => {
            state.burgerStructure.ingredients.splice(action.payload, 1);
        },
    }
});

export default burgerConstructorSlice.reducer;