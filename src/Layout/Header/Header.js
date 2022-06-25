import { useContext } from 'react';

import Navigation from './Navigation';
import HeaderButtons from './HeaderButtons';
import classes from './Header.module.css';

const Header = () => {
  return (
    <div className={classes['header-wrapper']}>
      <header className={`container ${classes.header}`}>
        <img
          src='https://cdn-icons-png.flaticon.com/512/553/553416.png'
          className={classes.logo}
          alt='home button'
        ></img>
        <Navigation />
        <HeaderButtons />
      </header>
    </div>
  );
};
export default Header;
