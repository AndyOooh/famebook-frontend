import { useRef, useContext } from 'react';

import AuthCtx from '../../store/auth-context';
import Modal from '../../UI/Modal/Modal';
import classes from './updateProfilePhoto.module.css';

const UpdateProfilPhoto = props => {
  const fileInputRef = useRef(null);

  const authCtx = useContext(AuthCtx);
  const { userId, token } = authCtx;
  console.log('userId', userId);


  const hideModalHandler = () => {
    props.hideModal();
  };

  //   SUBMITHANDLER --------------------------------------------
  const submitPhotoHandler = async event => {
    event.preventDefault();

    // console.log('fileInputRef', fileInputRef);
    // const photo = fileInputRef.current.value;
    const photo1 = event.currentTarget;
    const photo2 = event.target.value;
    const photo3 = event.target.files[0];

    // console.log('photo', photo);
    console.log('photo1', photo1);
    console.log('photo2', photo2);
    console.log('photo3', photo3);

    const formD = new FormData();
    // formD.append('image', photo);
    formD.append('image', photo3);
    formD.append('some-num', 22);

    // clg formData
    for (var pair of formD.entries()) {
      console.log('from iterator:', pair[0] + ', ' + pair[1]);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + token,
          // 'Content-Type': 'application/json',
        },
        body: formD,
      });
      const data = await response.json();
      console.log('data', data); // just logging resposne for now
    } catch (error) {
      console.log('error', error);
    }
  };

  //   ---------------------------------------------

  return (
    <>
      <Modal styles={[classes.modal, classes.card]} hideModal={hideModalHandler}>
        <div className={classes['image-buttons']}>
          <label className={classes['filepicker-label']} htmlFor='image'>
            Choose image from file
            <input
              className={classes['file-picker']}
              id='image'
              type='file'
              name='image'
              ref={fileInputRef}
            />
          </label>
          {/* <button htmlFor='files'>
              Choose image from file2
              <input className={classes['file-picker']} id='files' type='file' />
            </button> */}
          <button>Take photo with webcam</button>
        </div>
        <button onClick={submitPhotoHandler}>Update photo</button>
      </Modal>
    </>
  );
};
export default UpdateProfilPhoto;
