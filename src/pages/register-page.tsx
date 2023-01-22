import { MainLayout } from "layouts/main-layout";
import { RegisterComponent } from "components/register-component/register-component";
import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect, FC } from "react";
import { Redirect, useLocation } from "react-router-dom";
import { errorSlice } from "services/reducers/error-slice";

export const RegisterPage: FC = () => {
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
};
