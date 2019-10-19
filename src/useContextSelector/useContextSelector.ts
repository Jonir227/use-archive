import { Context, useContext } from 'react';

export const useContextSelector = <T, F extends (p: T) => any>(
  context: Context<T>,
  selector: F,
): ReturnType<F> => {
  const data = useContext(context);
  return selector(data);
};
