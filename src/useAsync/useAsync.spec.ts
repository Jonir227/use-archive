import { renderHook } from '@testing-library/react-hooks';
import useAsync from './useAsync';
import { mockAsync } from '../utils';

describe('useAsync', () => {
  it('shoultd follow proper async call step', async () => {
    const fetchData = mockAsync({ name: 'john', age: 27 }, 100);
    const { result, waitForNextUpdate } = renderHook(() =>
      useAsync({ endpoint: fetchData }, { name: '', age: 0 }),
    );
    expect(result.current).toEqual(['WAITING', { name: '', age: 0 }]);
    await waitForNextUpdate();
    expect(result.current).toEqual(['SUCCESS', { name: 'john', age: 27 }]);
  });

  it('shoultd end with failure state when api call is failed', async () => {
    const fetchData = mockAsync({ name: 'john', age: 27 }, 100);
    const { result, waitForNextUpdate } = renderHook(() =>
      useAsync({ endpoint: fetchData, params: [true] }, { name: '', age: 0 }),
    );
    expect(result.current).toEqual(['WAITING', { name: '', age: 0 }]);
    await waitForNextUpdate();
    expect(result.current).toEqual(['FAILURE', { name: '', age: 0 }]);
  });

  it('should pass proper argment to endpoint', async () => {
    const fetchData = jest.fn((message: string) => mockAsync({ message }, 100)(true));
    renderHook(() => useAsync({ endpoint: fetchData, params: ['hi'] }, { message: '' }));
    expect(fetchData).toHaveBeenCalledWith('hi');
  });
});
