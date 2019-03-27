import { useEffect } from 'react';
import usePrevious from './usePrevious';

/**
 * 이전 값과 비교하여 실행하는 함수
 * @param value 얕은 비교를 실행할 값
 * @param callback 값이 변경되었을때 실행할 함수
 */
const useDidUpdate = (value, callback) => {
  const prevValue = usePrevious(value);

  useEffect(() => {
    if (prevValue && prevValue !== value) {
      callback(prevValue, value);
    }
  }, [value]);
};

export default useDidUpdate;
