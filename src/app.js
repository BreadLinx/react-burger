import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {getIngridients} from './services/actions/getIngridients-action.js';
import {MainPage} from './pages/main-page.js';
import {LoginPage} from './pages/login-page.js';
import {RegisterPage} from './pages/register-page.js';
import {ForgotPasswordPage} from './pages/forgot-password-page.js';
import {ResetPasswordPage} from './pages/reset-password-page.js';
import {ProfilePage} from './pages/profile-page.js';
import {NotFound404} from './pages/not-found-404.js';
import {getUserData} from './services/actions/getUserData-action.js';
import {getCookie} from './utils/cookies.js';
import {ProtectedRoute} from './components/protected-route/protected-route.js';

export function App() {
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getIngridients());
      const authToken = getCookie('authToken');
      if(authToken) {
        dispatch(getUserData());
      }
    }, []);

    return (
      <Router>
        <Switch>
          <Route path='/' exact={true}>
            <MainPage/>
          </Route>
          <Route path='/login' exact={true}>
            <LoginPage/>
          </Route>
          <Route path='/register' exact={true}>
            <RegisterPage/>
          </Route>
          <Route path='/forgot-password' exact={true}>
            <ForgotPasswordPage/>
          </Route>
          <Route path='/reset-password' exact={true}>
            <ResetPasswordPage/>
          </Route>
          {/* <Route path='/profile' exact={true}>
            <ProfilePage/>
          </Route> */}
          <ProtectedRoute path='/profile' exact={true}>
            <ProfilePage/>
          </ProtectedRoute>
          <Route>
            <NotFound404/>
          </Route>
        </Switch>
      </Router>
    );
}