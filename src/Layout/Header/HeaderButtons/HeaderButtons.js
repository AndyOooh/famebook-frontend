import { useContext } from 'react';

import Authcontext from '../../../store/auth-context';
import AuthButtons from '../../../components/Auth/AuthButtons';
import ProfileButtons from '../../../components/Dashboard/ProfileButtons';
import classes from './Headerbuttons.module.css';

const HeaderButtons = () => {
  const authCtx = useContext(Authcontext);

  return (
    <div className={classes['header-buttons']}>
      {!authCtx.isLoggedIn && <AuthButtons />}
      {authCtx.isLoggedIn && <ProfileButtons logout={classes.logout} onLogout={authCtx.logout} user={authCtx.userId} />}
    </div>
  );
};
export default HeaderButtons;
