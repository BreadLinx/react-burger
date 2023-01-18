import burgerIngredientsReducer from "./burger-ingredients-slice";
import orderDetailsReducer from "./order-details-slice";
import burgerConstructorReducer from "./burger-constructor-slice";
import forgotPasswordReducer from "./forgot-password-slice";
import loginAuthReducer from "./login-auth-slice";
import errorReducer from "./error-slice";
import successReducer from "./success-slice";
import feedReducer from "./feed-slice";
import userOrdersReducer from "./user-orders-slice";
import webSocketReducer from "./webSocket-slice";

export const rootReducer = {
  burgerIngredientsReducer,
  orderDetailsReducer,
  burgerConstructorReducer,
  forgotPasswordReducer,
  loginAuthReducer,
  errorReducer,
  successReducer,
  feedReducer,
  userOrdersReducer,
  webSocketReducer,
};
