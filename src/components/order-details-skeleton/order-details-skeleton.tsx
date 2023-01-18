import styles from "./order-skeleton.module.css";
import { FC } from "react";

export const OrderDetailsSkeleton: FC = () => {
  return (
    <div
      className={`${styles.skeleton}`}
      style={{ animationName: styles.flashingSkeleton }}
    ></div>
  );
};
