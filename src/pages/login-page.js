import {MainLayout} from '../layouts/main-layout.js';
import {LoginComponent} from '../components/login-component/login-component.js';
import {useSelector} from 'react-redux';
import {Redirect, useParams} from 'react-router-dom';

export function LoginPage() {
  const {name} = useSelector(state => state.loginAuthReducer.user);
  const params = useParams();

  console.log(params);

  // if(name) {
  //   return (
  //     <Redirect to={state?.from || '/'} />
  //   );
  // }

  return (
    <MainLayout>
      <LoginComponent/>
    </MainLayout>
  );
}