import { NavLink } from 'react-router-dom';

const ProfileButtons = props => {
  return (
    <>
      <NavLink to={'/users/' + props.user}>Profile</NavLink>
      <div className={props.logout} onClick={props.onLogout}>
        Log Out
      </div>
    </>
  );
};
export default ProfileButtons;
