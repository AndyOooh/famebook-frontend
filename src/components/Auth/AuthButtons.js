import { useState } from 'react';

import Modal from '../../UI/Modal/Modal';
import LoginForm from './Login/LoginForm';
import SignupForm from './Signup/SignupForm';

import classes from './AuthButtons.module.css';

const AuthButtons = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const toggleModalHandler = () => {
    setShowModal(!showModal);
  };

  const showLoginHandler = () => {
    toggleModalHandler();
    setIsLogin(true);
  };

  const showSignupHandler = () => {
    toggleModalHandler();
    setIsLogin(false);
  };

  const switchFormHandler = () => {
    setIsLogin(!isLogin);
  };

  return (
    <>
      {showModal && (
        <Modal styles={[classes.modal, classes.card]} hideModal={toggleModalHandler}>
          {isLogin && <LoginForm onSwitch={switchFormHandler} />}
          {!isLogin && <SignupForm onSwitch={switchFormHandler} />}
        </Modal>
      )}
      <div>
        <button type='button' onClick={showLoginHandler}>
          Log In
        </button>
        <button type='button' onClick={showSignupHandler}>
          Sign Up
        </button>
      </div>
    </>
  );
};
export default AuthButtons;
