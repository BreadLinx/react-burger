import orderDetailsSkeletonStyles from './order-skeleton.module.css';

export function OrderDetailsSkeleton() {
    return (
        <div className={`${orderDetailsSkeletonStyles.skeleton}`} style={{animationName: orderDetailsSkeletonStyles.flashingSkeleton}}></div>
    );
}