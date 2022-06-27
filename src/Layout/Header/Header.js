import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';

import Navigation from './Navigation/Navigation';
import HeaderButtons from './HeaderButtons/HeaderButtons';
import classes from './Header.module.css';
import Logo from '../../assets/Icons/logo.png';

const Header = () => {
  return (
    <div className={classes['header-wrapper']}>
      <header className={`container ${classes.header}`}>
        <div className={classes['header-left']}>
          <NavLink to='/' className={navData => (navData.isActive ? classes.active : '')}>
            <img src={Logo} className={classes['header-home-logo']} alt='' />
          </NavLink>
          <HiMenu className={classes.burger} />
        </div>
        <div className={classes.nav}>
          <Navigation />
        </div>
        <HeaderButtons />
      </header>
    </div>
  );
};
export default Header;
