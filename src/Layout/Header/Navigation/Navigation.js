import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AiOutlineHome, AiOutlineShop } from 'react-icons/ai';
import { MdOndemandVideo, MdOutlineGroups } from 'react-icons/md';

import AuthCtx from '../../../store/auth-context';
import classes from './Navigation.module.css';

const Navigation = () => {
  const authCtx = useContext(AuthCtx);

  return (
    <nav>
      <ul className='menu'>
        <li>
          <NavLink to='/' className={navData => (navData.isActive ? classes.active : '')}>
            <AiOutlineHome />
          </NavLink>
        </li>
        <li>
          <NavLink to='/countdown' className={navData => (navData.isActive ? classes.active : '')}>
            <MdOndemandVideo />
          </NavLink>
        </li>
        {authCtx.isLoggedIn && (
          <>
            <li>
              <NavLink to='/user' className={navData => (navData.isActive ? classes.active : '')}>
                <AiOutlineShop />
              </NavLink>
            </li>
            <li>
              <NavLink to='/user' className={navData => (navData.isActive ? classes.active : '')}>
                <MdOutlineGroups />
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
