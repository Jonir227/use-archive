import { ChangeEvent, useCallback, useMemo, useState } from 'react';

/**
 * input을 사용하는 hooks
 * @param initialValue 초기값
 * @param validator input값 검증하는함수
 */
const useInput = (initialValue: string, validator?: (value: string) => boolean) => {
  const [inputValue, setInputValue] = useState(initialValue);

  const isValid = useMemo(() => {
    if (!validator) {
      return true;
    }
    return validator(inputValue);
  }, [inputValue]);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setInputValue(value);
  }, []);

  return [inputValue, onChange, isValid] as const;
};

export default useInput;
