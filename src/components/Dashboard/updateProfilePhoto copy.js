import { useState, useRef, useContext } from 'react';

import AuthCtx from '../../store/auth-context';
import Modal from '../../UI/Modal/Modal';
import FileUploader from '../../UI/Form/FileUploader copy';
import classes from './updateProfilePhoto.module.css';

const UpdateProfilePhoto = props => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { userId, token } = useContext(AuthCtx);

  //   SUBMITHANDLER --------------------------------------------
  const submitHandler = async event => {
    event.preventDefault();

    const formData = new FormData();
    const modal = props.modalIsCover ? 'cover-image' : 'profile-image'
    formData.append(modal, selectedFile);

    // log formData
    for (var pair of formData.entries()) {
      console.log('from iterator:', pair[0] + ', ' + pair[1]);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + token,
          // 'Content-Type': 'application/json',
        },
        body: formData,
      });
      const data = await response.json();
      console.log('data', data.data); // just logging response data for now
      props.updateUser()
    } catch (error) {
      console.log('error', error);
    }
    props.hideModal();
  };

  //props for FileUploader ---
  const onFileSelectSuccess = file => setSelectedFile(file);
  const onFileSelectError = ({ error }) => alert(error);

  return (
    <>
      <Modal styles={[classes.modal, classes.card]} hideModal={() => props.hideModal()}>
        <form onSubmit={submitHandler}>
          <div className={classes['image-buttons']}>
            <FileUploader
              onFileSelectSuccess={onFileSelectSuccess}
              onFileSelectError={onFileSelectError}
            />
            {/* TODO create component for webcam, see VideoApp */}
            <button>Take photo with webcam</button>
          </div>
          {/* TODO style p tag (maybe look into shitespace in temp lit) */}
          {selectedFile && <p>{`Chosen photo:  ${selectedFile.name}       poij`}</p>}
          <button type='submit'>Update photo</button>
        </form>
      </Modal>
    </>
  );
};
export default UpdateProfilePhoto;
