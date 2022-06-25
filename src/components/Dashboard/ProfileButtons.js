import { NavLink } from 'react-router-dom';

// import classes from './ProfileButtons.module.css';

const ProfileButtons = props => {
  return (
    <div>
      {/* <NavLink to={`/users/${props.user}`}>Profile</NavLink>  */}
      <NavLink to={'/users/' + props.user}>Profile</NavLink>
      {/* <button>Profile</button> */}
      <button onClick={props.onLogout}>Log Out</button>
    </div>
  );
};
export default ProfileButtons;
