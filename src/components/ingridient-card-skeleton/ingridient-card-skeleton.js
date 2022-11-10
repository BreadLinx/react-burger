import IngridientCardSkeletonStyles from './ingridient-card-skeleton.module.css';

export function IngridientCardSkeleton() {
    return (
        <li className={`pl-4 pr-4 ${IngridientCardSkeletonStyles.cardSkeleton}`} style={{animationName: IngridientCardSkeletonStyles.flashingSkeleton}}>
          <div className={IngridientCardSkeletonStyles.imageSkeleton}></div>
          <div className={`${IngridientCardSkeletonStyles.priceSkeleton} mt-1`}></div>
          <div className={`${IngridientCardSkeletonStyles.textSkeleton} mt-1`}></div>
        </li>
    );
}