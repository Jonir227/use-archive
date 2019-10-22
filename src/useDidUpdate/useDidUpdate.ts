import { useEffect } from 'react';
import usePrevious from '../usePrevious';

/**
 * 이전 값과 비교하여 실행하는 함수
 * @param value 얕은 비교를 실행할 값
 * @param callback 값이 변경되었을때 실행할 함수
 * @param compare 값을 비교하는 함수. 기본은 !== 로 비교한다.
 */
const useDidUpdate = <T>(
  value: T,
  callback: (prevValue: T, value: T) => void,
  compare: (prev: T, next: T) => boolean = (p, n) => p !== n,
) => {
  const prevValue = usePrevious(value);

  useEffect(() => {
    if (prevValue && compare(prevValue, value)) {
      callback(prevValue, value);
    }
  }, [value]);
};

export default useDidUpdate;
