import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  burgerStructure: {
    bun: null,
    ingredients: [],
  },
  dragData: {
    dragStatus: false,
  },
};

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructorSlice",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === "bun") {
        state.burgerStructure.bun = action.payload;
        return;
      }
      if (state.burgerStructure.bun) {
        state.burgerStructure.ingredients.push(action.payload);
      }
    },
    deleteIngredient: (state, action) => {
      state.burgerStructure.ingredients.splice(action.payload, 1);
    },
    changeIngredientsPlaces: (state, action) => {
      state.burgerStructure.ingredients.splice(action.payload.hoverIndex, 1);
      state.burgerStructure.ingredients.splice(
        action.payload.dragIndex,
        0,
        action.payload.item,
      );
    },
    applyDraggingStyles: (state, action) => {
      state.burgerStructure.ingredients = state.burgerStructure.ingredients.map(
        item => ({ ...item, isDragging: item.dragId === action.payload }),
      );
    },
    startDragging: state => {
      state.dragData.dragStatus = true;
    },
    endDragging: state => {
      state.dragData.dragStatus = false;
      state.burgerStructure.ingredients = state.burgerStructure.ingredients.map(
        item => ({ ...item, isDragging: false }),
      );
    },
    resetBurgerConstructor: state => {
      state.burgerStructure = {
        bun: null,
        ingredients: [],
      };
    },
  },
});

export default burgerConstructorSlice.reducer;
