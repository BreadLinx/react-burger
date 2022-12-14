import styles from "./order-skeleton.module.css";

export function OrderDetailsSkeleton() {
  return (
    <div
      className={`${styles.skeleton}`}
      style={{ animationName: styles.flashingSkeleton }}
    ></div>
  );
}
