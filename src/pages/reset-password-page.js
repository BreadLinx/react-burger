import { MainLayout } from "../layouts/main-layout.js";
import { ResetPasswordComponent } from "../components/reset-password-component/reset-password-component.js";
import { useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

export function ResetPasswordPage() {
  const { name } = useSelector(state => state.loginAuthReducer.user);
  const { state } = useLocation();

  if (name) {
    return <Redirect to={state?.from?.pathname || "/"} />;
  }

  return (
    <MainLayout>
      <ResetPasswordComponent />
    </MainLayout>
  );
}
