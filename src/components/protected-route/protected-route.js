import { Route, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { errorSlice } from "../../services/reducers/error-slice.js";
import { PropTypes } from "prop-types";

export function ProtectedRoute({ children, ...rest }) {
  const dispatch = useDispatch();

  const { isUserAuthorized } = useSelector(
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
  }, []);

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
}

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
  rest: PropTypes.any,
};
