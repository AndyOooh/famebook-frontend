import { NavLink } from 'react-router-dom';

const ProfileButtons = props => {
  return (
    <>
      <NavLink to={'/users/' + props.user}>Profile</NavLink>
      <div onClick={props.onLogout} style={{ color: 'pink' }}>
        Log Out
      </div>
    </>
  );
};
export default ProfileButtons;
