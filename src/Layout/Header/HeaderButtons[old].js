import { useState } from 'react';

import classes from './HeaderButtons.module.css';
import Modal from '../../UI/Modal/Modal';
import SignupForm from '../../components/Auth/Signup/SignupForm';
import LoginForm from '../../components/Auth/Login/LoginForm copy';

const HeaderButtons = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const showLoginHandler = event => {
    hideSignupHandler()
    setShowLoginModal(true);
  };

  const hideLoginHandler = event => {
    setShowLoginModal(false);
  };

  const showSignupHandler = event => {
    hideLoginHandler()
    setShowSignupModal(true);
  };

  const hideSignupHandler = event => {
    setShowSignupModal(false);
  };

  return (
    <>
      {showLoginModal && (
        <Modal styles={[classes.modal, classes.card]} hideModal={hideLoginHandler}>
          <LoginForm />
          {/* TODO: turn fragment into a div with some styling and add a button to switch between login and signup below the form(s) */}
        </Modal>
      )}
      {showSignupModal && (
        <Modal styles={[classes.modal, classes.card]} hideModal={hideSignupHandler}>
          <SignupForm />
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
export default HeaderButtons;
