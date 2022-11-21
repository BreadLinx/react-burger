import {Link} from "react-router-dom";
import styles from './profile-page-nav.module.css';

export function ProfilePageNav({activeLink = 'profile'}) {
  return (
    <div className={`${styles.box} mt-30 mr-15`}>
      <nav className={styles.linkBox}>
        <Link to='/profile' className={`text text_type_main-medium ${styles.link} ${activeLink === 'profile' ? styles.activeLink : 'text_color_inactive'}`}>Профиль</Link>
        <Link to='/profile/orders' className={`text text_type_main-medium ${styles.link} ${activeLink === 'history' ? styles.activeLink : 'text_color_inactive'}`}>История заказов</Link>
        <Link to='/logout' className={`text text_type_main-medium ${styles.link} text_color_inactive`}>Выход</Link>
      </nav>
      <p className={`text text_type_main-default text_color_inactive ${styles.infoText}`}>В этом разделе вы можете изменить свои персональные данные</p>
    </div>
  );
}