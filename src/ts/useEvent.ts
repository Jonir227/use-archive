import { ChangeEvent, RefObject, useLayoutEffect } from 'react';

type EventFunction = (e: ChangeEvent<any> | Event) => void;

const useEvent = (target: RefObject<HTMLElement>, eventType: string, eventFn: EventFunction, watch: any[] = []) => {
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
