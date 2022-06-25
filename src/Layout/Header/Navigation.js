import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import AuthCtx from '../../store/auth-context';
import classes from './Navigation.module.css';

const Navigation = () => {
  const authCtx = useContext(AuthCtx);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to='/' className={navData => (navData.isActive ? classes.active : '')}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/countdown' className={navData => (navData.isActive ? classes.active : '')}>
            Countdown App
          </NavLink>
        </li>
        {authCtx.isLoggedIn && (
          <li>
            <NavLink to='/user' className={navData => (navData.isActive ? classes.active : '')}>
              Profile
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
