import { useCallback } from 'react';
import { GradientButton } from '../ui/GradientButton';
import { useContent } from '../../hooks/useContent';
import { fetchHeroContent } from '../../services/api';
import styles from './HeroSection.module.css';


const NavSkeleton = () => (
  <div className={styles.navSkeletonBar}>
    <div className={`${styles.skLine} ${styles.skNav}`} />
  </div>
);

const HeroSkeletonBlock = () => (
  <div className={styles.skeletonWrap}>
    <div className={`${styles.skLine} ${styles.skLineTitle}`} />
    <div className={`${styles.skLine} ${styles.skLineGradient}`} />
    <div className={`${styles.skLine} ${styles.skLineSub}`} />
    <div className={`${styles.skLine} ${styles.skLineSub2}`} />
    <div className={styles.skBtn} />
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div className={styles.errorState}>
    <span className={styles.errorIcon}>⚠️</span>
    <p className={styles.errorMessage}>{message}</p>
    <GradientButton onClick={onRetry}>Retry</GradientButton>
  </div>
);

export const HeroSection = () => {
  const fetchFn = useCallback(() => fetchHeroContent(), []);
  const { data, loading, error, retry } = useContent(fetchFn);

  return (
    <section className={styles.heroWrapper}>
      {loading && <NavSkeleton />}

      <div className={styles.heroBody}>
        {error ? (
          <ErrorState message={error} onRetry={retry} />
        ) : loading ? (
          <HeroSkeletonBlock />
        ) : (
          <div className={styles.heroInner}>
            <h1 className={styles.headline}>
              <span className={styles.headlinePrefix}>{data.hero.headlinePrefix}</span>
              <br />
              <span className={styles.headlineGradient}>{data.hero.headlineGradient}</span>
            </h1>
            <p className={styles.subheadline}>
              {data.hero.subheadlineParts.map((part, i) =>
                part.bold
                  ? <strong key={i}>{part.text}</strong>
                  : <span key={i}>{part.text}</span>
              )}
            </p>
            <GradientButton className={styles.heroCta}>
              {data.hero.cta.label}
            </GradientButton>
          </div>
        )}
      </div>
    </section>
  );
};
