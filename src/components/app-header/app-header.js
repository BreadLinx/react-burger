import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { Link, useRouteMatch } from "react-router-dom";

export function AppHeader() {
  const { url } = useRouteMatch();

  return (
    <header className={styles.header}>
      <Link
        to="/"
        className={`p-5 ${styles.button} ${
          url.endsWith("/") ? styles.button_active : ""
        }`}
      >
        <BurgerIcon type={url.endsWith("/") ? "primary" : "secondary"} />
        <p className="text text_type_main-default">Конструктор</p>
      </Link>
      <Link to="/" className={`p-5 ${styles.button}`}>
        <ListIcon type="secondary" />
        <p className="text text_type_main-default">Лента заказов</p>
      </Link>
      <Logo />
      <Link
        to="/profile"
        className={`p-5 ${styles.button} ${
          url.endsWith("/profile") ? styles.button_active : ""
        }`}
      >
        <ProfileIcon
          type={url.endsWith("/profile") ? "primary" : "secondary"}
        />
        <p className="text text_type_main-default">Личный кабинет</p>
      </Link>
    </header>
  );
}
