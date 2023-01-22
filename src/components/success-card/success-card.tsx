import styles from "./success-card.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";
import { useAppSelector } from "hooks";

export const SuccessCard: FC = () => {
  const { visibility, message } = useAppSelector(state => state.successReducer);

  return (
    <div
      className={`${styles.successBox} ${
        visibility ? styles.successBoxVisible : ""
      }`}
    >
      <CheckMarkIcon type="success" />
      <p className={`text text_type_main-small ${styles.successText}`}>
        {message}
      </p>
    </div>
  );
};
