import { MainLayout } from "../layouts/main-layout.js";
import { ResetPasswordComponent } from "../components/reset-password-component/reset-password-component.js";
import { useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { errorSlice } from "../services/reducers/error-slice.js";
import { useEffect } from "react";

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const { state } = useLocation();

  const { showError, hideError } = errorSlice.actions;

  useEffect(() => {
    if (state?.forgotStatus !== "success") {
      dispatch(
        showError(
          "Вы еще не запросили код подтверждения. Переадресация на страницу запроса.",
        ),
      );
      setTimeout(() => {
        dispatch(hideError());
      }, 6500);
    }
  }, []);

  return (
    <>
      {state?.forgotStatus !== "success" ? (
        <Redirect to={"/forgot-password"} />
      ) : (
        <MainLayout>
          <ResetPasswordComponent />
        </MainLayout>
      )}
    </>
  );
}
