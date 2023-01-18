import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDraggableCard, ICard } from "types/types";

interface IInitialState {
  burgerStructure: {
    bun: ICard | null;
    ingredients: IDraggableCard[];
  };
  dragData: {
    dragStatus: boolean;
  };
}

const initialState: IInitialState = {
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
    addIngredient: (state, action: PayloadAction<IDraggableCard | ICard>) => {
      if (action.payload.type === "bun") {
        state.burgerStructure.bun = action.payload as ICard;
        return;
      }
      if (state.burgerStructure.bun) {
        state.burgerStructure.ingredients.push(
          action.payload as IDraggableCard,
        );
      }
    },
    deleteIngredient: (state, action: PayloadAction<number>) => {
      state.burgerStructure.ingredients.splice(action.payload, 1);
    },
    changeIngredientsPlaces: (
      state,
      action: PayloadAction<{
        hoverIndex: number;
        dragIndex: number;
        item: IDraggableCard;
      }>,
    ) => {
      state.burgerStructure.ingredients.splice(action.payload.hoverIndex, 1);
      state.burgerStructure.ingredients.splice(
        action.payload.dragIndex,
        0,
        action.payload.item,
      );
    },
    applyDraggingStyles: (state, action: PayloadAction<number>) => {
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
