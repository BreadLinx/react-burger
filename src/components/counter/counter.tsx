import styles from "./counter.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { FC } from "react";

interface ICounter {
  value: number;
}

export const Counter: FC<ICounter> = ({ value }) => {
  return (
    <span className={`text text_type_digits-medium ${styles.totalCounter}`}>
      {value}
      <CurrencyIcon type="primary" />
    </span>
  );
};
