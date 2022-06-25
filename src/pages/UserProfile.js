import { useEffect, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Spinner from '../UI/Spinners/LoaderSpinner';
import spinnerImage from '../assets/static/Spin-1.8s-143px.svg';
import iconCamera from '../assets/Icons/camera-solid.svg';
import AuthCtx from '../store/auth-context';
// import UpdateProfilePhoto from '../components/Dashboard/updateProfilePhoto';
import UpdateProfilePhoto from '../components/Dashboard/updateProfilePhoto copy';
// import UpdateProfilePhoto from '../components/Dashboard/updateProfilePhoto copy 2';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  console.log('UserProfile');
  // const [user, setUser] = useState({ coverPhotoUrl: '../assets/static/Spin-1.8s-143px.svg' });
  // const [user, setUser] = useState({ coverPhotoUrl: Spinner });
  const [user, setUser] = useState({ coverPhotoUrl: spinnerImage });
  const [showChangePhoto, setChangePhoto] = useState(false);
  const [modalIsCover, setModalIsCover] = useState(false)

  console.log('user.coverPhotoUrl', user.coverPhotoUrl);

  const authCtx = useContext(AuthCtx);
  const { userId, token } = authCtx;

  const fetchUser = async () => {
    console.log('fetch User');
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log('fetched useer data', data)
    // setObjectState((prevState) => ({
    //   ...prevState,
    //   secondKey: 'value',
    // }));
    setUser(prevUser => ({
      ...prevUser,
      ...data.user,
    })); // we get a data obj with a user obj from backend
  };

  const toggleModalHandler = () => {
    setChangePhoto(!showChangePhoto);
  };

  const coverModalHandler = () => {
    toggleModalHandler()
    setModalIsCover(true)
  }

  const profileModalHandler  = () => {
    toggleModalHandler()
    setModalIsCover(false) 
  }

  useEffect(() => {
    console.log('useEffect fecth user');
    fetchUser();
  }, []);

  console.log('user in UserProfile', user);

  const profileSrc = `${process.env.REACT_APP_BACKEND_URL}/${user.profileImageUrl}`;
  console.log('profileSrc', profileSrc);

  // const coverClasses = user.coverPhotoUrl ? `${classes.cover} ${classes['cover-photo']}` : `${classes.cover}`

  // const coverPhotoUrl = user.coverPhotoUrl
  //   ? user.coverPhotoUrl
  //   : '/src/assets/static/Spin-1.8s-143px.svg';

  return (
    <div className={classes['page-wrapper']}>
      {showChangePhoto && (
        <UpdateProfilePhoto updateUser={fetchUser} hideModal={toggleModalHandler} modalIsCover={modalIsCover}/>
      )}
      {/* <div className={classes.cover}  ></div> */}
      {/* <div className={classes.cover} style={{backgroundImage: `url(${coverPhotoUrl})`}} ></div> */}
      <div
        className={classes.cover}
        // style={{ backgroundImage: 'url(http://localhost:3000/static/media/Spin-1.8s-143px.a1d7880687027a30c747.svg)' }}
        // style={{ backgroundImage: `url(${user.coverImageUrl})` }}
        style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/${user.coverImageUrl})` }}
      >
        <div className={classes['edit-cover']} role='button' onClick={coverModalHandler}>
          <img src={iconCamera} alt='' /> Edit cover photo
        </div>
      </div>

      {/* <div className={coverClasses}   ></div> */}
      {/* <p style="color: red">text</p> */}
      <div className={classes['profile-details']}>
        <div className={classes['profile-photo-wrapper']}>
          <img className={classes['profile-photo']} src={profileSrc} alt='' />
          {/* <img className={classes['profile-photo']} src={user.profilePhotoUrl} alt='' /> */}
          <div className={classes['change-photo']} role='button' onClick={profileModalHandler}>
            <img src={iconCamera} alt='' />
          </div>
        </div>
        <div className={classes['user-data']}>
          <h3>{user.username}</h3>
          <p> Email: {user.email}</p>
          <p> Id: {user._id}</p>
          <p> Password: {user.password}</p>
        </div>
        <button className={classes['edit-button']}>Edit Profile</button>
      </div>

      <NavLink to='/users/edit'>Edit Profile</NavLink>
      <div className={classes.userData}>
        <h2> Email: {user.email}</h2>
        <h2> Id: {user._id}</h2>
        <h2> Password: {user.password}</h2>
      </div>
    </div>
  );
};
export default UserProfile;
