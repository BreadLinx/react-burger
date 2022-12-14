import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { getIngridients } from "../../services/actions/getIngridients-action.js";
import { MainPage } from "../../pages/main-page.js";
import { LoginPage } from "../../pages/login-page.js";
import { RegisterPage } from "../../pages/register-page.js";
import { ForgotPasswordPage } from "../../pages/forgot-password-page.js";
import { ResetPasswordPage } from "../../pages/reset-password-page.js";
import { ProfilePage } from "../../pages/profile-page.js";
import { IngredientPage } from "../../pages/ingredient-page.js";
import { FeedPage } from "../../pages/feed-page.js";
import { NotFound404 } from "../../pages/not-found-404.js";
import { getUserData } from "../../services/actions/getUserData-action.js";
import { getCookie } from "../../utils/cookies.js";
import { ProtectedRoute } from "../../components/protected-route/protected-route.js";
import { loginAuthSlice } from "../../services/reducers/login-auth-slice.js";
import { Modal } from "../modal/modal.js";
import { IngredientDetails } from "../ingredient-details/ingredient-details.js";
import { errorSlice } from "../../services/reducers/error-slice.js";
import { OrderFeedModal } from "../order-feed-modal/order-feed-modal.js";
import { FeedOrderPage } from "../../pages/feed-order-page.js";
import { OrdersOrderPage } from "../../pages/orders-order-page.js";

export function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { ingredientsError } = useSelector(
    state => state.burgerIngredientsReducer,
  );

  const { makeUserAuthorizedTrue, makeUserAuthorizedFalse } =
    loginAuthSlice.actions;
  const { showError, hideError } = errorSlice.actions;

  useEffect(() => {
    dispatch(getIngridients());
    const authToken = getCookie("authToken");
    if (authToken) {
      dispatch(makeUserAuthorizedTrue());
      dispatch(getUserData());
    } else {
      dispatch(makeUserAuthorizedFalse());
    }
  }, []);

  useEffect(() => {
    if (ingredientsError) {
      dispatch(
        showError(
          "При выполнении запроса произошла ошибка. Немного подождите или попробуйте перезагрузить страницу.",
        ),
      );
      setTimeout(() => {
        dispatch(hideError());
      }, 10000);
    }
  }, [ingredientsError, dispatch, showError, hideError]);

  const background = location.state?.background;

  function closeIngredientPopup() {
    history.replace({ pathname: "/" });
  }

  function closeOrderFeedPopup() {
    history.replace({ pathname: "/feed" });
  }

  function closePersonalOrderPopup() {
    history.replace({ pathname: "/profile/orders" });
  }

  return (
    <>
      <Switch location={background || location}>
        <Route path="/" exact>
          <MainPage />
        </Route>
        <Route path="/login" exact>
          <LoginPage />
        </Route>
        <Route path="/register" exact>
          <RegisterPage />
        </Route>
        <Route path="/forgot-password" exact>
          <ForgotPasswordPage />
        </Route>
        <Route path="/reset-password" exact>
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile/orders/:id" exact>
          <OrdersOrderPage />
        </ProtectedRoute>
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact>
          <IngredientPage />
        </Route>
        <Route path="/feed" exact>
          <FeedPage />
        </Route>
        <Route path="/feed/:id" exact>
          <FeedOrderPage />
        </Route>
        <Route>
          <NotFound404 />
        </Route>
      </Switch>
      {background && (
        <Route path="/ingredients/:id">
          <Modal closePopup={closeIngredientPopup}>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/feed/:id">
          <Modal closePopup={closeOrderFeedPopup}>
            <OrderFeedModal />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/profile/orders/:id">
          <Modal closePopup={closePersonalOrderPopup}>
            <OrderFeedModal />
          </Modal>
        </Route>
      )}
    </>
  );
}
