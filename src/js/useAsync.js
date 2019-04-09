import { useEffect, useReducer } from 'react';

/**
 * 마운트 되자마자 호출되는 비동기
 * @param entity : api 호출부분과 파라미터
 * @param defaultState : 기본 파라미터
 */
const useAsync = (entity, defaultState) => {
  const [{ state, data }, setState] = useReducer((prev, curr) => ({ ...prev, ...curr }), {
    data: defaultState,
    state: 'INIT',
  });

  useEffect(() => {
    const { endpoint, params } = entity;
    setState({ state: 'WAITING' });
    endpoint
      .apply(null, params || [])
      .then(res => {
        setState({ state: 'SUCCESS', data: res });
      })
      .catch(e => {
        console.log(e);
        setState({ state: 'FAILURE' });
      });
  }, []);

  return [state, data];
};
