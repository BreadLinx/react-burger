import { Route, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
  const { isUserAuthorized } = useSelector(
    state => state.loginAuthReducer.user,
  );

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
