import { useRef } from 'react';

function useOnce<T extends (...p: any[]) => any>(init: T): ReturnType<T>;
function useOnce<T extends number | string | object>(init: T): T;
function useOnce<T>(init: T): T {
  let value = init;
  if (typeof value === 'function') {
    value = value();
  }
  return useRef(value).current;
}

export default useOnce;
