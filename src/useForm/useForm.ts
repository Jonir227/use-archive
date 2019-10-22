import { ChangeEvent, useCallback, useReducer } from 'react';
import { useSetState } from '..';

type FormValidator<T> = (value: T) => boolean;

/**
 * 폼 전체를 관리하기 위한 hooks
 * @param initialValue form의 초기값
 * @param formValidator form 값을 검증해주는 함수
 */
const useFormState = <T extends Object>(initialValue: T, formValidator: FormValidator<T>) => {
  const [formValue, setFormValue] = useSetState(initialValue);

  const onChangeFormValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value, id: key } = e.currentTarget;
      if (formValue.hasOwnProperty(key)) {
        setFormValue({ [key]: value } as any);
      } else {
        throw 'Error: provided key is not in Form value';
      }
    },
    [setFormValue],
  );

  const isFormValid = formValidator(formValue);

  return [formValue, onChangeFormValue, isFormValid, setFormValue] as const;
};

export default useFormState;
