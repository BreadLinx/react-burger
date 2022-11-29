import styles from "./success-card.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

export function SuccessCard() {
  const { visibility, message } = useSelector(state => state.successReducer);

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
}
