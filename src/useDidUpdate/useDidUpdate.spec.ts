import { renderHook, act } from '@testing-library/react-hooks';
import useDidUpdate from './useDidUpdate';

const testDidUpdate = (toBe: boolean) => (
  prev: any,
  next: any,
  fn?: (prev: any, next: any) => boolean,
) => {
  let success = false;
  const checkFunction = () => {
    success = true;
  };
  const { result, rerender } = renderHook(({ data }) => useDidUpdate(data, checkFunction, fn), {
    initialProps: { data: prev },
  });
  rerender({ data: next });
  expect(success).toBe(toBe);
};

const testUpdate = testDidUpdate(true);
const testNotUpdate = testDidUpdate(false);

describe('useDidUpdate', () => {
  it('update if deps are not equal', () => {
    testUpdate('hi', 'notHI');
    testUpdate({ data: 123 }, { data: 12345 });
  });
  it('block update if deps are equal', () => {
    testNotUpdate('a', 'a');
    const obj = { data: 'aaa' };
    testNotUpdate(obj, obj);
  });
  it('compares with provided compare function', () => {
    testNotUpdate('a', 'b', () => false);
    testUpdate('a', 'b', () => true);
  });
});
