import { MainLayout } from "../layouts/main-layout.js";
import { ForgotPasswordComponent } from "../components/forgot-password-component/forgot-password-component.js";
import { useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

export function ForgotPasswordPage() {
  const { name } = useSelector(state => state.loginAuthReducer.user);
  const { state } = useLocation();

  if (name) {
    return <Redirect to={state?.from?.pathname || "/"} />;
  }

  return (
    <MainLayout>
      <ForgotPasswordComponent />
    </MainLayout>
  );
}
