import styles from './Skeleton.module.css';

/**
 * Skeleton Component
 * Shows placeholder while content is loading
 */
export const Skeleton = ({ count = 1, height = '20px', width = '100%', className = '' }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`${styles.skeleton} ${className}`}
          style={{ height, width }}
        />
      ))}
    </>
  );
};

/**
 * CardSkeleton Component
 * Shows placeholder for product cards
 */
export const CardSkeleton = ({ count = 3 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.cardSkeleton}>
          <div className={styles.imageSkeletonWrapper}>
            <div className={styles.imageSkeleton} />
          </div>
          <div className={styles.contentSkeleton}>
            <Skeleton height="20px" width="70%" />
            <Skeleton height="14px" width="100%" />
            <Skeleton height="14px" width="90%" />
          </div>
        </div>
      ))}
    </>
  );
};

/**
 * HeroSkeleton Component
 * Shows placeholder for hero section
 */
export const HeroSkeleton = () => {
  return (
    <div className={styles.heroSkeleton}>
      <Skeleton height="60px" width="80%" className={styles.titleSkeleton} />
      <Skeleton height="20px" width="60%" className={styles.subtitleSkeleton} />
      <Skeleton height="16px" width="40%" className={styles.textSkeleton} />
      <div className={styles.buttonSkeleton} />
    </div>
  );
};
