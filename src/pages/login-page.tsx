import { MainLayout } from "layouts/main-layout";
import { LoginComponent } from "components/login-component/login-component";
import { useEffect, FC } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { errorSlice } from "services/reducers/error-slice";
import { useAppDispatch, useAppSelector } from "hooks";

export const LoginPage: FC = () => {
  const dispatch = useAppDispatch();

  const { name } = useAppSelector(state => state.loginAuthReducer.user);
  const { state } = useLocation() as {
    state: {
      from?: { pathname: string };
    };
  };

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
          <LoginComponent />
        </MainLayout>
      )}
    </>
  );
};
