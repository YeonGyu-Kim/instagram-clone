import { throttle } from 'lodash';
import { useEffect, useRef, useState, useMemo } from 'react';

/* export default function useThrottle(keyword: string, delay: number = 2000) {
  const isThrottled = useRef(false);
  const [throttledValue, setThrottledValue] = useState(keyword);

  useEffect(() => {
    if (isThrottled.current === false) {
      setThrottledValue(keyword);
      isThrottled.current = true;
      setTimeout(() => {
        if (isThrottled.current) {
          isThrottled.current = false;
        }
      }, delay);
    }
  }, [keyword, delay]);
  return throttledValue;
} */

export default function useThrottle(
  setThrottledValue: (keyword: string) => void
) {
  const handleThrottle = useMemo(
    () =>
      throttle((value: string) => {
        setThrottledValue(value);
      }, 2000),
    [setThrottledValue]
  );

  return { handleThrottle };
}
