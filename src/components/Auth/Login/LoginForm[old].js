import { useContext } from 'react';

import AuthContext from '../../../store/auth-context';

import useInput from '../../../hooks/use-input';
import Input from '../../../UI/Input/Input';
import classes from './LoginForm.module.css';

// Before storing tokenData as an obj in localstorage

const LoginForm = () => {
  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputHandler: emailInputHandler,
    blurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(value => value.includes('@'));

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputHandler: passwordInputHandler,
    blurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(value => value.trim().length > 2);

  const formIsValid = emailIsValid && passwordIsValid;

  const authCtx = useContext(AuthContext);

  console.log('authCtx', authCtx);

  // SUBMITHANDLER --------------
  const loginHandler = async event => {
    event.preventDefault();
    console.log('enteredEmail in submit', enteredEmail);

    // TODO: MAYBE have authState, MAYBE using context. have a loading spinner.

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: enteredEmail, password: enteredPassword }),
      });
      console.log('response', response);
      if (response.status === 422) {
        throw new Error('Validation failed.');
      }
      if (response.status !== 200 && response.status !== 201) {
        console.log('Error!');
        throw new Error('Could not authenticate you!');
      }
      const data = await response.json(); //have to await this or promise might be pending.
      console.log('data', data);

      authCtx.login(data.token, data.userId, data.expirationTime);
      // authCtx.login(response);

      // TODO:
      // loading
    } catch (error) {
      // TODO force error (wrong url e.g.) to see which error is logged and how we can use that for user feedback
      console.log(error);

      // TODO:
      // this.setState({
      //   isAuth: false,
      //   authLoading: false,
      //   error: err,
      // });
    }
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
        {inputElements}
        <button type='submit' disabled={!formIsValid}>
          Log In
        </button>
      </form>
    </>
  );
};

export default LoginForm;
