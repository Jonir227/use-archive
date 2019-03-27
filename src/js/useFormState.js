import { useCallback, useReducer } from 'react';

/**
 * 폼 전체를 관리하기 위한 hooks
 * @param initialValue form의 초기값
 * @param formValidator form 값을 검증해주는 함수
 */
const useFormState = (initialValue, formValidator) => {
  const [formValue, setFormValue] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    initialValue,
  );

  const onChangeFormValue = useCallback(e => {
    const { value, id: key } = e.currentTarget;
    setFormValue({ [key]: value });
  }, []);

  const isFormFilled = formValidator(formValue);

  return [formValue, onChangeFormValue, isFormFilled, setFormValue];
};

export default useFormState;
