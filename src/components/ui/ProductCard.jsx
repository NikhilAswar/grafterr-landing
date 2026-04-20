import styles from './ProductCard.module.css';

/**
 * ProductCard - matches Figma: title top-left, large product image, light border card
 */
export const ProductCard = ({ product }) => {
  const { image, title } = product;
  return (
    <div className={styles.card}>
      <p className={styles.title}>{title}</p>
      <div className={styles.imageWrap}>
        <img
          src={image.src}
          alt={image.alt}
          className={styles.image}
          loading="lazy"
        />
      </div>
    </div>
  );
};
