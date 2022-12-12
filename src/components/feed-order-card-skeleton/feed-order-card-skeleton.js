import styles from "./feed-order-card-skeleton.module.css";

export function FeedOrderCardSkeleton() {
  return (
    <li
      className={styles.box}
      style={{ animationName: styles.flashingSkeleton }}
    >
      <div className={styles.number}></div>
      <div className={styles.name}></div>
      <div className={styles.counter}></div>
    </li>
  );
}
