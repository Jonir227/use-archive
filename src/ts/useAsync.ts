import { useEffect } from 'react';
import useSetState from './useSetState';

interface IAsyncEntity<T, A extends any[]> {
  endpoint: ApiEndPoint<T, A | never[]>;
  params?: A;
}

interface IAsyncState<T> {
  state: State;
  data: T;
}

/**
 * 마운트 되자마자 호출되는 비동기
 * @param entity : api 호출부분과 파라미터
 * @param defaultState : 기본 파라미터
 */
const useAsync = <T, A extends any[]>(entity: IAsyncEntity<T, A>, defaultState: T): [State, T] => {
  const [{ state, data }, setState] = useSetState<IAsyncState<T>>({
    data: defaultState,
    state: 'INIT',
  });

  useEffect(() => {
    const { endpoint, params } = entity;
    setState({ state: 'WAITING' });
    endpoint
      .apply(null, params || [])
      .then((res: T) => {
        setState({ state: 'SUCCESS', data: res });
      })
      .catch((e: Error) => {
        console.log(e);
        setState({ state: 'FAILURE' });
      });
  }, []);

  return [state, data];
};

export default useAsync;
