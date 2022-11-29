import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { getIngridients } from "./services/actions/getIngridients-action.js";
import { MainPage } from "./pages/main-page.js";
import { LoginPage } from "./pages/login-page.js";
import { RegisterPage } from "./pages/register-page.js";
import { ForgotPasswordPage } from "./pages/forgot-password-page.js";
import { ResetPasswordPage } from "./pages/reset-password-page.js";
import { ProfilePage } from "./pages/profile-page.js";
import { IngredientPage } from "./pages/ingredient-page.js";
import { NotFound404 } from "./pages/not-found-404.js";
import { getUserData } from "./services/actions/getUserData-action.js";
import { getCookie } from "./utils/cookies.js";
import { ProtectedRoute } from "./components/protected-route/protected-route.js";
import { loginAuthSlice } from "./services/reducers/login-auth-slice.js";
import { Modal } from "./components/modal/modal.js";
import { IngredientDetails } from "./components/ingredient-details/ingredient-details.js";
import { errorSlice } from "./services/reducers/error-slice.js";

export function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { ingredientsError } = useSelector(
    state => state.burgerIngredientsReducer,
  );

  const { makeUserAuthorizedTrue } = loginAuthSlice.actions;
  const { showError, hideError } = errorSlice.actions;

  useEffect(() => {
    dispatch(getIngridients());
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
        <ProtectedRoute path="/profile" exact>
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredients/:id" exact>
          <IngredientPage />
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
    </>
  );
}
