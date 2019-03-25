import { useState } from 'react';

const useLocalStorage = (key, defaultValue) => {
  if (typeof defaultValue !== 'object')
    throw Error('기본값과 변경된 값은 항상 객체여야 합니다.');

  const [data, setData] = useState(() => {
    const fromStorage = localStorage.getItem(key);
    if (fromStorage == null) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
    }
    return fromStorage ? JSON.parse(fromStorage) : defaultValue;
  });

  const setStorage = value => {
    if (typeof defaultValue !== 'object')
      throw Error('기본값과 변경된 값은 항상 객체여야 합니다.');
    localStorage.setItem(key, JSON.stringify(value));
    setData(value);
  };

  return [data, setStorage];
};

export default useLocalStorage;
