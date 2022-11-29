import { MainLayout } from "../layouts/main-layout.js";
import { RegisterComponent } from "../components/register-component/register-component.js";
import { useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";

export function RegisterPage() {
  const { name } = useSelector(state => state.loginAuthReducer.user);
  const { state } = useLocation();

  if (name) {
    return <Redirect to={state?.from?.pathname || "/"} />;
  }

  return (
    <MainLayout>
      <RegisterComponent />
    </MainLayout>
  );
}
