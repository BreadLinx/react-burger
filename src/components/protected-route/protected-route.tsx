import { Route, Redirect } from "react-router-dom";
import { useEffect, FC, ReactNode } from "react";
import { errorSlice } from "services/reducers/error-slice";
import { useAppSelector, useAppDispatch } from "hooks";

interface IProtectedRoute {
  children: ReactNode;
  path?: string;
  exact?: boolean;
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
  const dispatch = useAppDispatch();

  const { isUserAuthorized } = useAppSelector(
    state => state.loginAuthReducer.user,
  );

  const { showError, hideError } = errorSlice.actions;

  useEffect(() => {
    if (isUserAuthorized === undefined) {
      return;
    }
    if (!isUserAuthorized) {
      dispatch(
        showError(
          "Вы не зашли в личный кабинет. Доступ к странице ограничен. Переадресация на страницу входа в личный кабинет.",
        ),
      );
      setTimeout(() => {
        dispatch(hideError());
      }, 5500);
    }
  }, [dispatch, hideError, showError, isUserAuthorized]);

  if (isUserAuthorized === undefined) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isUserAuthorized ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};
