import {Link, useHistory} from "react-router-dom";
import styles from './profile-page-nav.module.css';
import {useCallback} from "react";
import {sendLogout} from '../../services/actions/sendLogout-action.js';
import {useDispatch} from "react-redux";

export function ProfilePageNav({activeLink = 'profile'}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const logOut = useCallback(() => {
    dispatch(sendLogout())
    .then((res) => {
      console.log(res);
      console.log('Барбарис');
    });
  }, [history, sendLogout]);

  return (
    <div className={`${styles.box} mt-30 mr-15`}>
      <nav className={styles.linkBox}>
        <Link to='/profile' className={`text text_type_main-medium ${styles.link} ${activeLink === 'profile' ? styles.activeLink : 'text_color_inactive'}`}>Профиль</Link>
        <Link to='/profile/orders' className={`text text_type_main-medium ${styles.link} ${activeLink === 'history' ? styles.activeLink : 'text_color_inactive'}`}>История заказов</Link>
        <button onClick={logOut} className={`text text_type_main-medium ${styles.button} text_color_inactive`} type='button'>Выход</button>
      </nav>
      <p className={`text text_type_main-default text_color_inactive ${styles.infoText}`}>В этом разделе вы можете изменить свои персональные данные</p>
    </div>
  );
}