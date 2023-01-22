import styles from "./not-found-404-component.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from "react-router-dom";
import { FC } from "react";

export const NotFountComponent: FC = () => {
  const history = useHistory();

  function handleButtonClick() {
    history.push({ pathname: "/" });
  }

  return (
    <section className={styles.section}>
      <h1 className="text text_type_digits-large mb-5 mt-15">404</h1>
      <p className="text text_type_main-small mb-20">
        Ошибка. Такой страницы не существует. Вы можете вернуться на главную.
      </p>
      <Button
        onClick={handleButtonClick}
        htmlType="button"
        type="primary"
        size="medium"
      >
        На главную
      </Button>
    </section>
  );
};
