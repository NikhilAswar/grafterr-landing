import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for fetching content with loading and error states
 */
export const useContent = (fetchFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetch = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const retry = useCallback(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, retry };
};
