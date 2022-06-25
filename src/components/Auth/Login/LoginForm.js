import { useContext, useState } from 'react';

import AuthCtx from '../../../store/auth-context';

import LoaderSpinner from '../../../UI/Spinners/LoaderSpinner';
import useInput from '../../../hooks/use-input';
import Input from '../../../UI/Form/Input/Input';
import classes from './LoginForm.module.css';

const LoginForm = props => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthCtx);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputHandler: emailInputHandler,
    blurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(value => value.includes('@'), error);

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputHandler: passwordInputHandler,
    blurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(value => value.trim().length > 2);

  const formIsValid = emailIsValid && passwordIsValid;

  // SUBMITHANDLER --------------
  const loginHandler = async event => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: enteredEmail, password: enteredPassword }),
      });
      const data = await response.json(); //have to await this or promise might be pending.

      if (response.ok) {
        return authCtx.login(data);
      }
      // could do two if checks for status 401 (email not found) and 422 (email + pw dosnt match), then have error state for each, like emailError and send that to the specific input via second arg to useInput.
      const error = new Error(data.message);
      throw error;
    } catch (error) {
      console.log('error', error);
      setError(error.message);
    }
    setIsLoading(false); // should it go in catch block and after if-blocks inside try?
    emailReset();
    passwordReset();
  };

  const emailInputClasses = emailHasError ? classes.invalid : '';
  const passwordInputClasses = passwordHasError ? classes.invalid : '';

  const inputsArray = [
    {
      label: 'Email',
      extraClasses: [emailInputClasses],
      input: {
        id: 'email',
        // type: 'email',
        value: enteredEmail,
        onChange: emailInputHandler,
        onBlur: emailBlurHandler,
      },
    },
    {
      label: 'Password',
      extraClasses: [passwordInputClasses],
      input: {
        id: 'password',
        // type: 'password',
        value: enteredPassword,
        placeholder: 'Min. 3 characters',
        onChange: passwordInputHandler,
        onBlur: passwordBlurHandler,
      },
    },
  ];

  const inputElements = inputsArray.map(inputObj => <Input key={inputObj.label} {...inputObj} />);

  return (
    <>
      <form className={classes.form} onSubmit={loginHandler}>
        {isLoading && <LoaderSpinner />}
        {!isLoading && (
          <>
            {inputElements}
            <button type='submit' disabled={!formIsValid}>
              Log In
            </button>
            <p className={classes.option}>
              Don't have an account yet?
              <span onClick={props.onSwitch}>Sign Up</span>
            </p>
            {!isLoading && error && <p className={classes.error}>{error}</p>}
          </>
        )}
      </form>
    </>
  );
};

export default LoginForm;
