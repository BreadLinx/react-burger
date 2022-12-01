import styles from './ingridient-card-skeleton.module.css';

export function IngridientCardSkeleton() {
    return (
        <li className={`pl-4 pr-4 ${styles.cardSkeleton}`} style={{animationName: styles.flashingSkeleton}}>
          <div className={styles.imageSkeleton}></div>
          <div className={`${styles.priceSkeleton} mt-1`}></div>
          <div className={`${styles.textSkeleton} mt-1`}></div>
        </li>
    );
}