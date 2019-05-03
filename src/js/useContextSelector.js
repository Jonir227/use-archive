import { useContext } from 'react';

export const useContextSelector = (context, selector) => {
  const data = useContext(context);
  return selector(data);
};
