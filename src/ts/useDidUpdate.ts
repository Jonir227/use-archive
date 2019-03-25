import { useEffect } from 'react';
import usePrevious from './usePrevious';

const useDidUpdate = <T>(value: T, callback: (prevValue: T, value: T) => void) => {
  const prevValue = usePrevious(value);

  useEffect(() => {
    if (prevValue && prevValue !== value) {
      callback(prevValue, value);
    }
  }, [value]);
};

export default useDidUpdate;
