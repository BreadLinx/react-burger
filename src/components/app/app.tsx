import { useEffect, FC } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { getIngridients } from "services/actions/getIngridients-action";
import { MainPage } from "pages/main-page";
import { LoginPage } from "pages/login-page";
import { RegisterPage } from "pages/register-page";
import { ForgotPasswordPage } from "pages/forgot-password-page";
import { ResetPasswordPage } from "pages/reset-password-page";
import { ProfilePage } from "pages/profile-page";
import { IngredientPage } from "pages/ingredient-page";
import { FeedPage } from "pages/feed-page";
import { NotFound404 } from "pages/not-found-404";
import { getUserData } from "services/actions/getUserData-action";
import { getCookie } from "utils/cookies";
import { ProtectedRoute } from "components/protected-route/protected-route";
import { loginAuthSlice } from "services/reducers/login-auth-slice";
import { Modal } from "components/modal/modal";
import { IngredientDetails } from "components/ingredient-details/ingredient-details";
import { errorSlice } from "services/reducers/error-slice";
import { OrderFeedModal } from "components/order-feed-modal/order-feed-modal";
import { FeedOrderPage } from "pages/feed-order-page";
import { OrdersOrderPage } from "pages/orders-order-page";
import { useAppDispatch, useAppSelector } from "hooks";

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation() as any;

  const history = useHistory();

  const { ingredientsError } = useAppSelector(
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
  }, [dispatch, makeUserAuthorizedTrue, makeUserAuthorizedFalse]);

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
};
