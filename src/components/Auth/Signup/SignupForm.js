import { useState } from 'react';

import LoaderSpinner from '../../../UI/Spinners/LoaderSpinner';
import Input from '../../../UI/Form/Input/Input';
import useInput from '../../../hooks/use-input';
import classes from './SignupForm.module.css';

const SignupForm = props => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    inputHandler: nameInputHandler,
    blurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(value => value.trim().length > 2, error);

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

  const {
    value: enteredConfPassword,
    isValid: confPasswordIsValid,
    hasError: confPasswordHasError,
    inputHandler: confPasswordInputHandler,
    blurHandler: confPasswordBlurHandler,
    reset: confPasswordReset,
  } = useInput(value => value === enteredPassword);

  const formIsValid = nameIsValid && emailIsValid && passwordIsValid && confPasswordIsValid;

  // ----- SUBMITHANDLER ------------

  const signupHandler = async event => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: enteredName,
          email: enteredEmail,
          password: enteredPassword,
          confirmPassword: enteredConfPassword,
        }),
      });
      const data = await response.json(); //have to await this or promise might be pending.

      if (response.ok) {
        console.log('json response in signup', data);
        return;

        // TODO: send verification email, unshow spinner, render success message: 'Successfully created user: <username>, an email has been sent to <email>'. Please verify your account by clicking the link.
      }
      const error = new Error(data.message);
      throw error;
    } catch (error) {
      // TODO force error (wrong url e.g.) to see which error is logged and how we can use that for user feedback
      console.log(error);
      setError(error.message);
    }
    setIsLoading(false);
    nameReset();
    emailReset();
    passwordReset();
    confPasswordReset();
  };

  const nameInputClasses = nameHasError ? classes.invalid : '';
  const emailInputClasses = emailHasError ? classes.invalid : '';
  const passwordInputClasses = passwordHasError ? classes.invalid : '';
  const confPasswordInputClasses = confPasswordHasError ? classes.invalid : '';

  const inputsArray = [
    {
      label: 'Username',
      extraClasses: [nameInputClasses],
      input: {
        id: 'username',
        placeholder: 'Choose a username',
        onChange: nameInputHandler,
        onBlur: nameBlurHandler,
      },
    },
    {
      label: 'Email',
      extraClasses: [emailInputClasses],
      input: {
        id: 'email',
        type: 'email',
        onChange: emailInputHandler,
        onBlur: emailBlurHandler,
      },
    },
    {
      label: 'Password',
      extraClasses: [passwordInputClasses],
      input: {
        id: 'password',
        type: 'password',
        placeholder: 'Min. 3 characters',
        onChange: passwordInputHandler,
        onBlur: passwordBlurHandler,
      },
    },
    {
      label: 'Re-enter Password',
      extraClasses: [confPasswordInputClasses],
      input: {
        id: 'confirmPassword',
        type: 'password',
        onChange: confPasswordInputHandler,
        onBlur: confPasswordBlurHandler,
      },
    },
  ];

  const inputElements = inputsArray.map(input => <Input key={input.label} {...input} />);

  return (
    <form className={classes.form} onSubmit={signupHandler}>
      {isLoading && <LoaderSpinner />}
      {!isLoading && (
        <>
          {inputElements}
          <button type='submit' disabled={!formIsValid}>
            Sign Up
          </button>
          <p>
            Already have an account?
            <span onClick={props.onSwitch}>Log In</span>
          </p>
        </>
      )}
    </form>
  );
};

export default SignupForm;
