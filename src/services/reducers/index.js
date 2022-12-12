import burgerIngredientsReducer from "./burger-ingredients-slice.js";
import orderDetailsReducer from "./order-details-slice.js";
import burgerConstructorReducer from "./burger-constructor-slice.js";
import forgotPasswordReducer from "./forgot-password-slice.js";
import loginAuthReducer from "./login-auth-slice.js";
import errorReducer from "./error-slice.js";
import successReducer from "./success-slice.js";
import feedReducer from "./feed-slice.js";

export const rootReducer = {
  burgerIngredientsReducer,
  orderDetailsReducer,
  burgerConstructorReducer,
  forgotPasswordReducer,
  loginAuthReducer,
  errorReducer,
  successReducer,
  feedReducer,
};
