import styles from "./loader.module.css";
import { FC } from "react";

export const Loader: FC = () => {
  return (
    <div className={styles.spinner}>
      <span>L</span>
      <span>O</span>
      <span>A</span>
      <span>D</span>
      <span>I</span>
      <span>N</span>
      <span>G</span>
    </div>
  );
};
