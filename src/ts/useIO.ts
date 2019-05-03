import { useEffect, useCallback, useMemo } from 'react';

type IntersectionObserverCallback = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver,
) => void;

const useIO = (cb: IntersectionObserverCallback) => {
  const io = useMemo(
    () =>
      new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          cb(entry, observer);
        });
      }),
    [],
  );

  useEffect(
    () => () => {
      io.disconnect();
    },
    [],
  );

  const observe = useCallback(el => {
    io.observe(el);
  }, []);

  const unobserve = useCallback(el => {
    io.unobserve(el);
  }, []);

  return [observe, unobserve, io];
};

export default useIO;