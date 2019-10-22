import { renderHook, act } from '@testing-library/react-hooks';
import useEvent from './useEvent';

describe('useEvent', () => {
  it('add event when mounted', () => {
    const eventFn = jest.fn();
    const el = document.createElement('button');
    const ref = { current: el };

    renderHook(() => useEvent(ref, 'click', eventFn));

    act(() => {
      ref.current.dispatchEvent(new Event('click'));
    });

    expect(eventFn).toHaveBeenCalled();
  });
  it('delete event when unmounted', () => {
    const eventFn = jest.fn();
    const el = document.createElement('button');
    const ref = { current: el };
    const { unmount } = renderHook(() => useEvent(ref, 'click', eventFn));

    unmount();

    act(() => {
      ref.current.dispatchEvent(new Event('click'));
    });

    expect(eventFn).toHaveBeenCalledTimes(0);
  });
});
