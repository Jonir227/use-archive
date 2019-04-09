import { useReducer } from 'react';

/**
 * 보일러플레이트 줄이기용 SetState
 * @param initialState 초기 상태값
 */
const useSetState = initialState =>
  useReducer((prev, curr) => ({ ...prev, ...curr }), initialState);

export default useSetState;
