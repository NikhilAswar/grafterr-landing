import styles from './GradientText.module.css';

/**
 * GradientText Component
 * Renders text with gradient styling
 */
export const GradientText = ({ children, className = '' }) => {
  return <span className={`${styles.gradientText} ${className}`}>{children}</span>;
};
