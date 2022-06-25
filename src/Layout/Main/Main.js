import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import classes from './Main.module.css';

import AuthCtx from '../../store/auth-context';
import Home from '../../pages/Home';
import Countdown from '../../pages/Countdown';
import UserProfile from '../../pages/UserProfile';
import EditProfile from '../../pages/EditProfile';

const Main = () => {
  const authCtx = useContext(AuthCtx);

  const mainClasses = `container ${classes.main} `; //order is important. container was overwriting margin-top.

  return (
    <main className={mainClasses}>
      <Routes>
        <Route path='/countdown' element={<Countdown />} />
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Navigate to='/' replace />} />
        {/* {authCtx.isLoggedIn && <Route path='/user' element={<UserProfile />} />} */}
        <Route path='/users'>
          {authCtx.isLoggedIn && <Route path=':id' element={<UserProfile />} />}
          {authCtx.isLoggedIn && <Route path='edit' element={<EditProfile />} />}
        </Route>
      </Routes>
    </main>
  );
};
export default Main;
