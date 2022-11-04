import burgerIngredientsReducer from './burger-ingredients-slice.js';
import ingredientDetailsReducer from './ingredient-details-slice.js';
import orderDetailsReducer from './order-details-slice.js';
import burgerConstructorReducer from './burger-constructor-slice.js';

export const rootReducer = {
    burgerIngredientsReducer,
    ingredientDetailsReducer,
    orderDetailsReducer,
    burgerConstructorReducer,
};