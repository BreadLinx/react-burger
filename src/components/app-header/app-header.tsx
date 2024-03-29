import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import { Link, useRouteMatch } from "react-router-dom";
import { FC } from "react";

export const AppHeader: FC = () => {
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
      <Link
        to="/feed"
        className={`p-5 ${styles.button} ${
          url.endsWith("/feed") ? styles.button_active : ""
        }`}
      >
        <ListIcon type={url.endsWith("/feed") ? "primary" : "secondary"} />
        <p className="text text_type_main-default">Лента заказов</p>
      </Link>
      <Link to="/" className={styles.logoWrapper}>
        <Logo />
      </Link>
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
};
