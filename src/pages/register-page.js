import { MainLayout } from "../layouts/main-layout.js";
import { RegisterComponent } from "../components/register-component/register-component.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { errorSlice } from "../services/reducers/error-slice.js";

export function RegisterPage() {
  const dispatch = useDispatch();

  const { name } = useSelector(state => state.loginAuthReducer.user);
  const { state } = useLocation();

  const { showError, hideError } = errorSlice.actions;

  useEffect(() => {
    if (name) {
      dispatch(
        showError(
          "Вы уже зарегестрированы и авторизованы. Переадресация на страницу следования.",
        ),
      );
      setTimeout(() => {
        dispatch(hideError());
      }, 4500);
    }
  }, [name, dispatch, showError, hideError]);

  return (
    <>
      {name ? (
        <Redirect to={state?.from?.pathname || "/"} />
      ) : (
        <MainLayout>
          <RegisterComponent />
        </MainLayout>
      )}
    </>
  );
}
