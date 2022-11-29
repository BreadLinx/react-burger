import { MainLayout } from "../layouts/main-layout.js";
import { LoginComponent } from "../components/login-component/login-component.js";
import { useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

export function LoginPage() {
  const { name } = useSelector(state => state.loginAuthReducer.user);
  const { state } = useLocation();

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
}
