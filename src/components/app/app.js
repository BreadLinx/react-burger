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
import { OrderPage } from "../../pages/order-page.js";

import { useSocket } from "../../hooks/useSocket.js";
import { FEED_URL } from "../../utils/burger-api.js";
import { feedSlice } from "../../services/reducers/feed-slice";

export function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const [connectFeed, sendMessage] = useSocket(FEED_URL, { onMessage });
  const { setFeedData } = feedSlice.actions;
  const { total } = useSelector(state => state.feedReducer);

  function onMessage(event) {
    const data = JSON.parse(event.data);
    if (!data.success) {
      return;
    }
    if (total !== data.total) {
      dispatch(setFeedData(data));
    }
  }

  const { ingredientsError } = useSelector(
    state => state.burgerIngredientsReducer,
  );

  const { makeUserAuthorizedTrue } = loginAuthSlice.actions;
  const { showError, hideError } = errorSlice.actions;

  useEffect(() => {
    document.title = "Build your burger of cosmo ingredients";
    dispatch(getIngridients());
    connectFeed();
    const authToken = getCookie("authToken");
    if (authToken) {
      dispatch(makeUserAuthorizedTrue());
      dispatch(getUserData());
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

  const feedOrders = useSelector(state => state.feedReducer.orders);
  const personalOrders = useSelector(state => state.userOrdersReducer.orders);

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
          <OrderPage orders={personalOrders} />
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
          <OrderPage orders={feedOrders} />
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
            <OrderFeedModal orders={feedOrders} />
          </Modal>
        </Route>
      )}
      {background && (
        <Route path="/profile/orders/:id">
          <Modal closePopup={closePersonalOrderPopup}>
            <OrderFeedModal orders={personalOrders} />
          </Modal>
        </Route>
      )}
    </>
  );
}
