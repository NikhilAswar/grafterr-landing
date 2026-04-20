import { useRef, useState } from 'react';
import { ProductCard } from './ProductCard';
import styles from './Carousel.module.css';
import arrowLeft from "../../assets/images/Vector-left.png";
import arrowRight from "../../assets/images/Vector-right.svg";

export const Carousel = ({ products = [], itemsPerView = 3, showArrows = true }) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const total = products.length;

  const loopedProducts = [...products, ...products];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNext();
      else goToPrevious();
    }
  };

  const slideWidth = 100 / itemsPerView;
  const translateX = -(currentIndex * slideWidth);

  return (
    <div className={styles.wrapper}>
      
      <div
        className={styles.trackContainer}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className={styles.track}
          style={{
            transform: `translateX(${translateX}%)`,
            transition: 'transform 300ms ease'
          }}
        >
          {loopedProducts.map((product, i) => (
            <div
              key={i}
              className={styles.slide}
              style={{ flex: `0 0 ${slideWidth}%` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {showArrows && total > 1 && (
        <div className={styles.arrowRow}>
          <button
            className={styles.arrow}
            onClick={goToPrevious}
            aria-label="Previous"
          >
            <img src={arrowLeft} alt="Previous" />
          </button>

          <button
            className={styles.arrow}
            onClick={goToNext}
            aria-label="Next"
          >
            <img src={arrowRight} alt="Next" />
          </button>
        </div>
      )}
    </div>
  );
};