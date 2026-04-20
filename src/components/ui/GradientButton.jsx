import styles from './GradientButton.module.css';

/**
 * GradientButton Component
 * Renders button with gradient background
 */
export const GradientButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
