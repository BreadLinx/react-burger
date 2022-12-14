import styles from "./feed-order-card-skeleton.module.css";
import { PropTypes } from "prop-types";

export function FeedOrderCardSkeleton({ withStatus = false }) {
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
}

FeedOrderCardSkeleton.propTypes = {
  withStatus: PropTypes.bool,
};
