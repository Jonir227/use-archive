import { Reducer, useCallback, useReducer } from 'react';

interface IAsyncState<T> {
  state: State;
  data: T;
}

/**
 * 상태, 데이터, 데이터 호출하는함수를 리턴하는 hooks
 * @param endpoint : api 호출하는 함수
 * @param defaultState : 기본 상태
 */
const useAsyncCallback = <T, A extends any[]>(
  endpoint: ApiEndPoint<T, A>,
  defaultState: T,
): [State, T, (...param: A) => void] => {
  const [{ state, data }, setState] = useReducer<Reducer<IAsyncState<T>, Partial<IAsyncState<T>>>>(
    (prev, curr) => ({ ...prev, ...curr }),
    {
      data: defaultState,
      state: 'INIT',
    },
  );

  const call = useCallback((...args: A) => {
    setState({ state: 'WAITING' });
    endpoint
      .apply(null, args || [])
      .then((res: T) => {
        setState({ state: 'SUCCESS', data: res });
      })
      .catch((e: Error) => {
        console.log(e);
        setState({ state: 'FAILURE' });
      });
  }, []);

  return [state, data, call];
};

export default useAsyncCallback;
