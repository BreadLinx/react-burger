import { Link, useLocation } from "react-router-dom";
import styles from "./profile-page-nav.module.css";
import { useCallback, useEffect } from "react";
import { sendLogout } from "../../services/actions/sendLogout-action.js";
import { useDispatch, useSelector } from "react-redux";
import { errorSlice } from "../../services/reducers/error-slice.js";

export function ProfilePageNav() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const { error, errorMessage } = useSelector(
    state => state.loginAuthReducer.requestStatus.logout,
  );

  const { showError, hideError } = errorSlice.actions;

  const logOut = useCallback(() => {
    dispatch(sendLogout());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      switch (errorMessage) {
        default:
          dispatch(
            showError(
              `Ошибка при попытке выхода из личного кабинета. Попробуйте еще раз. Код ошибки: ${errorMessage}`,
            ),
          );
      }
      setTimeout(() => {
        dispatch(hideError());
      }, 10000);
    }
  }, [error, errorMessage, dispatch, showError, hideError]);

  return (
    <div className={`${styles.box} mt-30 mr-15`}>
      <nav className={styles.linkBox}>
        <Link
          to="/profile"
          className={`text text_type_main-medium ${styles.link} ${
            pathname.endsWith("/profile")
              ? styles.activeLink
              : "text_color_inactive"
          }`}
        >
          Профиль
        </Link>
        <Link
          to="/profile/orders"
          className={`text text_type_main-medium ${styles.link} ${
            pathname.endsWith("/profile/orders")
              ? styles.activeLink
              : "text_color_inactive"
          }`}
        >
          История заказов
        </Link>
        <button
          onClick={logOut}
          className={`text text_type_main-medium ${styles.button} text_color_inactive`}
          type="button"
        >
          Выход
        </button>
      </nav>
      <p
        className={`text text_type_main-default text_color_inactive ${styles.infoText}`}
      >
        {pathname.endsWith("/profile") &&
          "В этом разделе вы можете изменить свои персональные данные"}
        {pathname.endsWith("/profile/orders") &&
          "В этом разделе вы можете просмотреть свою историю заказов"}
      </p>
    </div>
  );
}
