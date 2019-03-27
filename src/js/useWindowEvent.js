import { useLayoutEffect } from 'react';

/**
 * 윈도우 이벤트를 등록하는 hooks
 * @param type 이벤트 타입
 * @param fn 이벤트 핸들러
 */
const useWindowEvent = (type, fn) => {
  useLayoutEffect(() => {
    window.addEventListener(type, fn);
    return () => {
      window.removeEventListener(type, fn);
    };
  });
};

export default useWindowEvent;
