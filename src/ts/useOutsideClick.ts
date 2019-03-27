import { RefObject, useRef } from 'react';
import useWindowEvent from './useWindowEvent';

/**
 * 타겟 ref의 바깥쪽을 클릭할때 실행하는 hooks
 * @param onClickOutside
 */
const useOutsideClick = <T extends HTMLElement>(onClickOutside: () => void): RefObject<T> => {
  const ref = useRef<T>(null);
  const handleClick: EventListener = e => {
    if (e.target && ref.current && !ref.current.contains(e.target as HTMLElement)) {
      onClickOutside();
    }
  };
  useWindowEvent('click', handleClick);

  return ref;
};

export default useOutsideClick;
