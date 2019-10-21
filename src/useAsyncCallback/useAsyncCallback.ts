import { useCallback } from 'react';
import useSetState from '../useSetState';

interface IAsyncState<T> {
  state: State;
  data: T;
}

/**
 * hook that returns [state, T, call]
 * @param endpoint : function returning promise<T>
 * @param defaultState : default State T.
 */
const useAsyncCallback = <T, A extends any[]>(endpoint: ApiEndPoint<T, A>, defaultState: T) => {
  const [{ state, data }, setState] = useSetState<IAsyncState<T>>({
    data: defaultState,
    state: 'INIT',
  });

  const call = useCallback(async (...args: A) => {
    setState({ state: 'WAITING' });
    try {
      const res = await endpoint.apply(null, args || []);
      setState({ state: 'SUCCESS', data: res });
    } catch {
      setState({ state: 'FAILURE' });
    }
  }, []);

  return [state, data, call] as const;
};

export default useAsyncCallback;
