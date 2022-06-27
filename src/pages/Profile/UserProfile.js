import { useEffect, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BsCameraFill } from 'react-icons/bs';

import uploadImage from '../../assets/images/upload-image.png';
import uploadImageSmall from '../../assets/images/upload-image-small.png';

import spinnerImage from '../../assets/static/Spin-1.8s-143px.svg';
import AuthCtx from '../../store/auth-context';
import UpdateProfilePhoto from '../../components/Dashboard/UpdateProfilePhoto';
import classes from './UserProfile.module.css';

const UserProfile = () => {
  console.log('UserProfile');
  const [user, setUser] = useState({ coverPhotoUrl: spinnerImage });
  const [showChangePhoto, setChangePhoto] = useState(false);
  const [modalIsCover, setModalIsCover] = useState(false);

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
    console.log('fetched useer data', data);

    setUser(prevUser => ({
      ...prevUser,
      ...data.user,
    })); // we get a data obj with a user obj from backend
  };

  const toggleModalHandler = () => {
    setChangePhoto(!showChangePhoto);
  };

  const coverModalHandler = () => {
    toggleModalHandler();
    setModalIsCover(true);
  };

  const profileModalHandler = () => {
    toggleModalHandler();
    setModalIsCover(false);
  };

  useEffect(() => {
    console.log('useEffect fecth user');
    fetchUser();
  }, []);

  console.log('user in UserProfile', user);

  const profileSrc = user.profileImageUrl
    ? `${process.env.REACT_APP_BACKEND_URL}/${user.profileImageUrl}`
    : uploadImage;

  // const coverClasses = user.coverPhotoUrl ? `${classes.cover} ${classes['cover-photo']}` : `${classes.cover}`

  // const coverPhotoUrl = user.coverPhotoUrl
  //   ? user.coverPhotoUrl
  //   : '/src/assets/static/Spin-1.8s-143px.svg';

  return (
    <div className={classes['page-wrapper']}>
      {showChangePhoto && (
        <UpdateProfilePhoto
          updateUser={fetchUser}
          hideModal={toggleModalHandler}
          modalIsCover={modalIsCover}
        />
      )}
      <div
        className={classes.cover}
        style={{
          backgroundImage: user.coverImageUrl
            ? `url(${process.env.REACT_APP_BACKEND_URL}/${user.coverImageUrl})`
            : `url(${uploadImageSmall})`,
        }}
      >
        <button className={classes['edit-cover-button']} onClick={coverModalHandler}>
          <BsCameraFill className={classes['camera-logo-cover']} /> Edit cover photo
        </button>
      </div>

      <div className={classes['profile-details']}>
        <div className={classes['profile-photo-wrapper']}>
          <img className={classes['profile-photo']} src={profileSrc} alt='' />
          <div className={classes['change-photo']} role='button' onClick={profileModalHandler}>
            <BsCameraFill />
          </div>
        </div>
        <div className={classes['user-data']}>
          <h3>{user.username}</h3>
          <p> Email: {user.email}</p>
          <p> Id: {user._id}</p>
          <p> Password: {user.password}</p>
        </div>
        <NavLink to='/users/edit'>
          <button className={`${classes['.edit-profile-button']} button`}>Edit Profile</button>
        </NavLink>
        <NavLink to='/users/edit'>
          <button className={`${classes['.edit-profile-button']} button`}>Edit Profile</button>
        </NavLink>{' '}
        <NavLink to='/users/edit'>
          <button className={`${classes['.edit-profile-button']} button`}>Edit Profile</button>
        </NavLink>{' '}
        <NavLink to='/users/edit'>
          <button className={`${classes['.edit-profile-button']} button`}>Edit Profile</button>
        </NavLink>
      </div>
    </div>
  );
};
export default UserProfile;
