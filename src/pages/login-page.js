import {MainLayout} from '../layouts/main-layout.js';
import {LoginComponent} from '../components/login-component/login-component.js';

export function LoginPage() {
  return (
    <MainLayout>
      <LoginComponent/>
    </MainLayout>
  );
}