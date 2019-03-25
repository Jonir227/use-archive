import { useEffect, useState } from 'react';

interface IAsyncEntity<T> {
  endpoint: ApiEndPoint<T>;
  params?: any[];
}

const useAsync = <T>(entity: IAsyncEntity<T>, defaultState: T): [State, T] => {
  const [status, setStatus] = useState<State>('INIT');
  const [data, setData] = useState<T>(defaultState);

  useEffect(() => {
    const { endpoint, params } = entity;
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

  return [status, data];
};

export default useAsync;
