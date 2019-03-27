import { useState } from 'react';

/**
 * 로컬스토리지를 사용하는 hooks
 * @param {string} key
 * @param {object} defaultValue
 */
const useLocalStorage = <T>(key: string, defaultValue: T): [T, typeof setStorage] => {
  if (typeof defaultValue !== 'object') throw Error('기본값과 변경된 값은 항상 객체여야 합니다.');

  const [data, setData] = useState(() => {
    const fromStorage = localStorage.getItem(key);
    if (fromStorage == null) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }
    return fromStorage ? JSON.parse(fromStorage) : defaultValue;
  });

  const setStorage = (value: T) => {
    if (typeof defaultValue !== 'object') throw Error('기본값과 변경된 값은 항상 객체여야 합니다.');
    localStorage.setItem(key, JSON.stringify(value));
    setData(value);
  };

  return [data, setStorage];
};

export default useLocalStorage;
