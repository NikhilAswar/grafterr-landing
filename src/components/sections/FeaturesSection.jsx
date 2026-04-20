
import { useCallback, useState, useEffect } from 'react';
import { Carousel } from '../ui/Carousel';
import { GradientButton } from '../ui/GradientButton';
import { useContent } from '../../hooks/useContent';
import { fetchFeaturesContent } from '../../services/api';
import styles from './FeaturesSection.module.css';
import shapeGreen from '../../assets/images/Vectorgreen.jpg';
import shapeOrnageoral from '../../assets/images/Vectororange.jpg';
import product1 from '../../assets/images/product1.png';
import product2 from '../../assets/images/product2.png';
import product3 from '../../assets/images/product3.png';

const ErrorState = ({ message, onRetry }) => (
  <div className={styles.errorState}>
    <span className={styles.errorIcon}></span>
    <p className={styles.errorMessage}>{message}</p>
    <GradientButton onClick={onRetry}>Retry</GradientButton>
  </div>
);

const SectionSkeleton = ({ count }) => (
  <div className={styles.skeletonSection}>
    <div className={styles.skHeader}>
      <div className={`${styles.skLine} ${styles.skTitle}`} />
      <div className={`${styles.skLine} ${styles.skTitle2}`} />
      <div className={`${styles.skLine} ${styles.skSub}`} />
      <div className={styles.skDivider} />
    </div>
    <div className={styles.skCards}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.skCard}>
          <div className={styles.skCardImg} />
          <div className={`${styles.skLine} ${styles.skCardTitle}`} />
        </div>
      ))}
    </div>
  </div>
);

export const FeaturesSection = () => {
  const fetchFn = useCallback(() => fetchFeaturesContent(), []);
  const { data, loading, error, retry } = useContent(fetchFn);
  const [itemsPerView, setItemsPerView] = useState(3);

  useEffect(() => {
    const getIPV = () => {
      const w = window.innerWidth;
      if (w <= 640) return 1;
      if (w <= 1024) return 2;
      return 3;
    };
    const onResize = () => setItemsPerView(getIPV());
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const productImages = {
    pos: product1,
    'self-service': product2,
    'kitchen-management': product3
  };

  const productsWithImages = data?.featuresSection?.products?.map((p) => ({
    ...p,
    image: {
      ...p.image,
      src: productImages[p.id]
    }
  }));

  return (
    <section className={styles.section} id="products">
      <div className={`${styles.inner} container`}>
        {error ? (
          <ErrorState message={error} onRetry={retry} />
        ) : loading ? (
          <SectionSkeleton count={itemsPerView} />
        ) : (
          <>
            <div className={styles.sectionHeader}>

              <img src={shapeGreen} className={`${styles.shape} ${styles.shapeCoral}`} alt="" />
              <img src={shapeOrnageoral} className={`${styles.shape} ${styles.shapeTeal}`} alt="" />

              <h2 className={styles.sectionTitle}>
                {data.featuresSection.titlePrefix}
                <span className={styles.titleAccent}>{data.featuresSection.titleAccent}</span>
                {data.featuresSection.titleSuffix}
              </h2>

              <p className={styles.sectionSubtitle}>
                {data.featuresSection.subtitle}
              </p>

              <div className={styles.dividerWrap}>
                <span className={styles.dividerLine} />
              </div>
            </div>
          
            <Carousel
              products={productsWithImages}
              itemsPerView={itemsPerView}
              showArrows={data.carousel?.showArrows !== false}
            />
          </>
        )}
      </div>
    </section>
  );
};