import { debounce } from 'lodash';
import { useState, useEffect, useCallback, useMemo } from 'react';

/* export default function useDebounce(value: string, delay: number = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
} */

export default function useDebounce(
  setDebouncedValue: (keyword: string) => void
) {
  const handleDebounced = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedValue(value);
      }, 500),
    [setDebouncedValue]
  );

  return { handleDebounced };
}
