import { useRef } from 'react';
import useWindowEvent from './useWindowEvent';

/**
 * 타겟 ref의 바깥쪽을 클릭할때 실행하는 hooks
 * @param onClickOutside
 */
const useOutsideClick = onClickOutside => {
  const ref = useRef(null);
  const handleClick = e => {
    if (e.target && ref.current && !ref.current.contains(e.target)) {
      onClickOutside();
    }
  };
  useWindowEvent('click', handleClick);

  return ref;
};

export default useOutsideClick;
