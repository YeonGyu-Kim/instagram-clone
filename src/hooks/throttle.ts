import { useEffect, useRef, useState } from 'react';

export default function useThrottle(keyword: string, delay: number = 500) {
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
}
