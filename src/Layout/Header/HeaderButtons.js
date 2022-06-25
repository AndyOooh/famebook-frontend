import { useContext } from 'react';

import Authcontext from '../../store/auth-context';
import AuthButtons from '../../components/Auth/AuthButtons';
import ProfileButtons from '../../components/Dashboard/ProfileButtons';

const HeaderButtons = () => {
  const authCtx = useContext(Authcontext);

  return (
    <>
      {!authCtx.isLoggedIn && <AuthButtons />}
      {authCtx.isLoggedIn && <ProfileButtons onLogout={authCtx.logout} user={authCtx.userId} />}
    </>
  );
};
export default HeaderButtons;
