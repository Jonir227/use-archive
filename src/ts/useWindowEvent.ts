import { useLayoutEffect } from 'react';

const useWindowEvent = (type: string, fn: EventListener) => {
  useLayoutEffect(() => {
    window.addEventListener(type, fn);
    return () => {
      window.removeEventListener(type, fn);
    };
  });
};

export default useWindowEvent;
