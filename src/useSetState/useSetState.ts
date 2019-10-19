import { Reducer, useReducer } from 'react';

type SetStateParam<T> = ((p: T) => T) | Partial<T>;

/**
 * 보일러플레이트 줄이기용 SetState
 * @param initialState 초기 상태값
 */
const useSetState = <T>(initialState: T) =>
  useReducer<Reducer<T, SetStateParam<T>>>(
    (prev, curr) => (typeof curr === 'function' ? curr(prev) : { ...prev, ...curr }),
    initialState,
  );

export default useSetState;
