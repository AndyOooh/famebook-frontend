import React, { useCallback, useState, useEffect } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: token => {},
  logout: () => {},
});

// Helper functions
const calculateRemainingTime = expirationTime => {
  const remainingTime = expirationTime ? expirationTime - new Date().getTime() : null; //get time converts to seconds since jan 1 1970
  return remainingTime;
};

const retrieveTokenFromLocalStorage = () => {
  if (!localStorage.getItem('tokenData')) {
    return null;
  }
  const { token, userId, expirationTime } = JSON.parse(localStorage.getItem('tokenData')) || {}; //see README

  const remainingTime = calculateRemainingTime(expirationTime);
  if (remainingTime <= 3000) {
    localStorage.removeItem('tokenData');
    return null;
  }

  return {
    token: token,
    userId: userId,
    remainingTime: remainingTime,
  };
};

// Provider Component --------------
export const AuthContextProvider = props => {
  const tokenData = retrieveTokenFromLocalStorage(); // if less than 1 min left = null, else obj with three props.

  let initialToken;
  let initialUserId;
  if (tokenData) {
    initialToken = tokenData.token;
    initialUserId = tokenData.userId;
  }

  const [token, setToken] = useState(initialToken);
  const [userId, setUserId] = useState(initialUserId);

  const userIsLoggedIn = !!token; //convert token to boolean. If truthy --> false --> true.

  const loginHandler = data => {
    setToken(data.token);
    setUserId(data.userId);
    localStorage.setItem('tokenData', JSON.stringify(data));
    const remainingTime = calculateRemainingTime(data.expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('tokenData');
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.remainingTime);
      logoutTimer = setTimeout(logoutHandler, tokenData.remainingTime);
    }
  }, [tokenData, logoutHandler]);

  // context values - 'global state' -----
  const contextValue = {
    userId: userId,
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
