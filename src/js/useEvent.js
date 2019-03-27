import { useLayoutEffect } from 'react';

/**
 * 이벤트를 걸어주는 함수
 * @param target 이벤트를 걸어줄 엘리먼트
 * @param eventType 이벤트 타입
 * @param eventFn 이벤트를 받아서 실행할 함수
 * @param watch hooks를 다시 실행시켜줄 배열
 */
const useEvent = (target, eventType, eventFn, watch = []) => {
  useLayoutEffect(() => {
    if (target.current) {
      target.current.addEventListener(eventType, eventFn);
    }
    return () => {
      if (target.current) {
        target.current.removeEventListener(eventType, eventFn);
      }
    };
  }, watch);
};

export default useEvent;
