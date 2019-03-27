import { useCallback, useMemo, useState } from 'react';

/**
 * input을 사용하는 hooks
 * @param initialValue 초기값
 * @param validator input값 검증하는함수
 */
const useInputState = (initialValue, validator) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const isValid = useMemo(() => {
    if (!validator) {
      return true;
    }
    return validator(inputValue);
  }, [inputValue]);

  const onChange = useCallback(e => {
    const { value } = e.currentTarget;
    setInputValue(value);
  }, []);

  return [inputValue, onChange, isValid];
};

export default useInputState;
