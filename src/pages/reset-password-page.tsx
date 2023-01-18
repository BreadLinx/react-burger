import { MainLayout } from "layouts/main-layout";
import { ResetPasswordComponent } from "components/reset-password-component/reset-password-component";
import { useDispatch } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import { errorSlice } from "services/reducers/error-slice";
import { useEffect } from "react";

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const { state } = useLocation() as {
    state: {
      forgotStatus?: string;
    };
  };

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
  }, [dispatch, hideError, showError, state?.forgotStatus]);

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
