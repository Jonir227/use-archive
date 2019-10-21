import useAsyncCallback from './useAsyncCallback';
import { mockAsync } from '../utils';
import { renderHook, act } from '@testing-library/react-hooks';

describe('useAsyncCallback', () => {
  it('should return proper return values', () => {
    const fetchData = mockAsync({ message: 'bye' });
    const { result } = renderHook(() => useAsyncCallback(fetchData, { message: 'hi' }));
    expect(result.current).toEqual(['INIT', { message: 'hi' }, expect.any(Function)]);
  });

  it('changes state when call method called', async () => {
    const fetchData = mockAsync({ message: 'bye' });
    const { result, waitForNextUpdate } = renderHook(() =>
      useAsyncCallback(fetchData, { message: 'hi' }),
    );
    // INIT
    const [init, initData, fetch] = result.current;
    expect(init).toBe('INIT');
    expect(initData).toEqual({ message: 'hi' });

    act(() => {
      fetch();
    });

    // WAITING
    const [waiting, waitingData] = result.current;
    expect(waiting).toBe('WAITING');
    expect(waitingData).toEqual({ message: 'hi' });

    await waitForNextUpdate();

    // SUCCESS
    const [success, successData] = result.current;
    expect(success).toBe('SUCCESS');
    expect(successData).toEqual({ message: 'bye' });
  });
});
