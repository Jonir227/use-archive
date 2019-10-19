import { useEffect, useRef } from 'react';

/**
 * 이전 랜더 시 계산된 값을 기억하는 hooks
 * @param value 기억할 값
 */
const usePrevious = <T>(value: T): T | null => {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export default usePrevious;
