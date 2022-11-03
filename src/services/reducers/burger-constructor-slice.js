import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    burgerStructure: {
        bun: null,
        ingredients: []
    },
    burgerStructureInId: [],
    dragData: {
        dragStatus: false,
    },
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
        changeIngredientsPlaces: (state, action) => {
            state.burgerStructure.ingredients.splice(action.payload.hoverIndex, 1);
            state.burgerStructure.ingredients.splice(action.payload.dragIndex, 0, action.payload.item);
        },
        applyDraggingStyles: (state, action) => {
            state.burgerStructure.ingredients.forEach(item => {
                item.isDragging = false;
            });
            state.burgerStructure.ingredients.find(item => item.dragId === action.payload).isDragging = true;
        },
        startDragging: (state) => {
            state.dragData.dragStatus = true;
        },
        endDragging: (state) => {
            state.dragData.dragStatus = false;
            state.burgerStructure.ingredients.forEach(item => {
                item.isDragging = false;
            });
        },
    }
});

export default burgerConstructorSlice.reducer;
