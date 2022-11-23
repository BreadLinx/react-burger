import {Route, Redirect} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

export function ProtectedRoute({ children, ...rest}) {
  const {name} = useSelector(state => state.loginAuthReducer.user);

  const [isUserLoaded, setUserLoaded] = useState(false);
  

  useEffect(() => {
    if(name) {
      setUserLoaded(true);
    }
  }, [name]);

  if(!isUserLoaded) {
    return null;
  }

  return (
    <Route {...rest} render={({ location }) => name ? (children) : (<Redirect to={{pathname: '/login', state: { from: location }}}/>)} />
  );
}