import styles from "./error-card.module.css";
import { InfoIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "react-redux";

export function ErrorCard() {
  const { visibility, message } = useSelector(state => state.errorReducer);

  return (
    <div
      className={`${styles.errorBox} ${
        visibility ? styles.errorBoxVisible : ""
      }`}
    >
      <InfoIcon type="error" />
      <p className={`text text_type_main-small ${styles.errorText}`}>
        {message}
      </p>
    </div>
  );
}
