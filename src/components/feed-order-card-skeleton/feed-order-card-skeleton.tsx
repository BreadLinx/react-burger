import styles from "./feed-order-card-skeleton.module.css";
import { FC } from "react";

interface IFeedOrderCardSkeleton {
  withStatus?: boolean;
}

export const FeedOrderCardSkeleton: FC<IFeedOrderCardSkeleton> = ({
  withStatus = false,
}) => {
  return (
    <li
      className={styles.box}
      style={{ animationName: styles.flashingSkeleton }}
    >
      <div className={styles.number}></div>
      <div className={styles.name}></div>
      {withStatus && <div className={styles.status}></div>}
      <div className={styles.counter}></div>
    </li>
  );
};
