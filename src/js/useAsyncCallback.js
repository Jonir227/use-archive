import { useCallback } from 'react';
import useSetState from './useSetState';

/**
 * 상태, 데이터, 데이터 호출하는함수를 리턴하는 hooks
 * @param endpoint : api 호출하는 함수
 * @param defaultState : 기본 상태
 */
const useAsyncCallback = (endpoint, defaultState) => {
  const [{ state, data }, setState] = useSetState({ data: defaultState, state: 'INIT' });

  const call = useCallback((...args) => {
    setState({ state: 'WAITING' });
    endpoint
      .apply(null, args || [])
      .then(res => {
        setState({ state: 'SUCCESS', data: res });
      })
      .catch(e => {
        console.log(e);
        setState({ state: 'FAILURE' });
      });
  }, []);

  return [state, data, call];
};

export default useAsyncCallback;
