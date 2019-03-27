import { useCallback, useState } from 'react';

/**
 * 상태, 데이터, 데이터 호출하는함수를 리턴하는 hooks
 * @param endpoint : api 호출하는 함수
 * @param defaultState : 기본 상태
 */
const useAsyncCallback = (endpoint, defaultState) => {
  const [status, setStatus] = useState('INIT');
  const [data, setData] = useState(defaultState);

  const call = useCallback((...params) => {
    setStatus('WAITING');
    endpoint
      .apply(null, params || [])
      .then(res => {
        setData(res);
        setStatus('SUCCESS');
      })
      .catch(() => {
        setStatus('FAILURE');
      });
  }, []);

  return [status, data, call];
};

export default useAsyncCallback;
