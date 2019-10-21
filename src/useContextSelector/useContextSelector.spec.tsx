import React, { useContext, createContext, FC } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useContextSelector from './';

const data = { message: 'hi', data: { deep: { inside: 'hi, again' } } };

const SampleContext = createContext(data);

describe('useContextSelector', () => {
  it('should select context properly', () => {
    const wrapper: FC = ({ children }) => {
      return <SampleContext.Provider value={data}>{children}</SampleContext.Provider>;
    };

    const { result } = renderHook(
      () => useContextSelector(SampleContext, store => store.data.deep.inside),
      { wrapper },
    );

    expect(result.current).toBe(data.data.deep.inside);
  });
});
