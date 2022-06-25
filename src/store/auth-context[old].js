import React, { useCallback, useState, useEffect } from 'react';

// Before storing tokenData as an obj in localstorage

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: token => {},
  logout: () => {},
});

const calculateRemainingTime = expirationTime => {
  const remainingTime = expirationTime ? expirationTime - new Date().getTime() : null; //get time converts to seconds since jan 1 1970
  return remainingTime;
};

const retrieveTokenFromLocalStorage = () => {
  const remainingTime = calculateRemainingTime(localStorage.getItem('expirationTime'));
  if (remainingTime <= 3000) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');
    return null;
  }
  return {
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId'),
    remainingTime: remainingTime,
  };
};

export const AuthContextProvider = props => {
  const tokenData = retrieveTokenFromLocalStorage(); // if less than 1 min left = null, else obj with three props.

  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token; //convert token to boolean. If truthy --> false --> true.

  const loginHandler = (token, userId, expirationTime) => {
    console.log('loginHandler');
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('expirationTime', expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  const logoutHandler = useCallback(() => {
    console.log('logoutHandler');
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationTime');

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

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContext;
