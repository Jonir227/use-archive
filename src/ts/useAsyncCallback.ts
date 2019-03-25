import { useCallback, useState } from 'react';

const useAsyncCallback = <T>(
  endpoint: ApiEndPoint<T>,
  defaultState: T,
): [State, T, (...p: any[]) => void] => {
  const [status, setStatus] = useState<State>('INIT');
  const [data, setData] = useState<T>(defaultState);

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
