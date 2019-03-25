import { useState, useCallback } from 'react';

const useInput = initialValue => {
  const [inputValue, setValue] = useState(initialValue);

  const onChangeInput = useCallback(e => {
    const { value } = e.currentTarget;
    setValue(value);
  }, []);

  return [inputValue, setValue, onChangeInput];
};

export default useInput;
