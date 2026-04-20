import styles from './FloatingShape.module.css';

/**
 * FloatingShape Component
 * Renders animated floating decorative shapes
 */
export const FloatingShape = ({ type = 'circle', top = '0', right = '0' }) => {
  const getShapeContent = () => {
    switch (type) {
      case 'circle':
        return (
          <svg viewBox="0 0 200 200" className={styles.shape}>
            <circle cx="100" cy="100" r="100" fill="currentColor" opacity="0.1" />
          </svg>
        );
      case 'rectangle':
        return (
          <svg viewBox="0 0 200 150" className={styles.shape}>
            <rect width="200" height="150" fill="currentColor" opacity="0.1" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`${styles.floatingShape} ${styles[type]}`}
      style={{
        top,
        right,
      }}
    >
      {getShapeContent()}
    </div>
  );
};
