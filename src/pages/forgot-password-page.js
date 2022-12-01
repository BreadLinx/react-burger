import { MainLayout } from "../layouts/main-layout.js";
import { ForgotPasswordComponent } from "../components/forgot-password-component/forgot-password-component.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { errorSlice } from "../services/reducers/error-slice.js";

export function ForgotPasswordPage() {
  const dispatch = useDispatch();

  const { name } = useSelector(state => state.loginAuthReducer.user);
  const { state } = useLocation();

  const { showError, hideError } = errorSlice.actions;

  useEffect(() => {
    if (name) {
      dispatch(
        showError("Вы уже авторизованы. Переадресация на страницу следования."),
      );
      setTimeout(() => {
        dispatch(hideError());
      }, 3500);
    }
  }, [name, dispatch, showError, hideError]);

  return (
    <>
      {name ? (
        <Redirect to={state?.from?.pathname || "/"} />
      ) : (
        <MainLayout>
          <ForgotPasswordComponent />
        </MainLayout>
      )}
    </>
  );
}
