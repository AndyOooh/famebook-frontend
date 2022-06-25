import { useState } from 'react';

const useInput = (validateInput, hasErr) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateInput(value);
  const hasError = isTouched && !isValid || hasErr

  const inputHandler = e => {
    setValue(e.target.value);
  };

  const blurHandler = e => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue('');
    setIsTouched(false);
  };

  return {
    value,
    isValid,
    hasError,
    inputHandler,
    blurHandler,
    reset,
  };
};
export default useInput;
