import { useLayoutEffect } from 'react';

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
