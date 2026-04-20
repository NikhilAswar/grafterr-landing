import { useState, useCallback, useEffect } from 'react';

/**
 * Custom hook for carousel state management
 */
export const useCarousel = (itemsCount, itemsPerView) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Recalculate when itemsPerView changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [itemsPerView]);

  const maxIndex = Math.max(0, itemsCount - itemsPerView);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(Math.max(0, Math.min(maxIndex, index)));
  }, [maxIndex]);

  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  return {
    currentIndex,
    canGoPrevious,
    canGoNext,
    goToPrevious,
    goToNext,
    goToSlide,
  };
};
