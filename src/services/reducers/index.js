import burgerIngredientsReducer from '../reducers/burgerIngredientsSlice.js';
import ingredientDetailsReducer from '../reducers/IngredientDetailsSlice.js';
import orderDetailsReducer from '../reducers/order-details-slice.js';
import burgerConstructorReducer from '../reducers/burger-constructor-slice.js';

export const rootReducer = {
    burgerIngredientsReducer,
    ingredientDetailsReducer,
    orderDetailsReducer,
    burgerConstructorReducer,
};