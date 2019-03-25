import { ChangeEvent, useCallback, useReducer } from 'react';

type FormValidator<T> = (value: T) => boolean;

const useFormState = <T>(
  initialValue: T,
  formValidator: FormValidator<T>,
): [T, typeof onChangeFormValue, boolean, React.Dispatch<{}>] => {
  const [formValue, setFormValue] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    initialValue,
  );

  const onChangeFormValue = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value, id: key } = e.currentTarget;
    setFormValue({ [key]: value });
  }, []);

  const isFormFilled = formValidator(formValue);

  return [formValue, onChangeFormValue, isFormFilled, setFormValue];
};

export default useFormState;
