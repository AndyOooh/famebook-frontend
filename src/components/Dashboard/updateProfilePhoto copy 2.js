import { useState, useContext } from 'react';

import AuthCtx from '../../store/auth-context';
import Modal from '../../UI/Modal/Modal';
import FileUploader from '../../UI/Form/FileUploader';
import classes from './updateProfilePhoto.module.css';

const UpdateProfilPhoto = props => {
  const [selectedFile, setSelectedFile] = useState(null);

  const authCtx = useContext(AuthCtx);
  const { userId, token } = authCtx;

  const hideModalHandler = () => {
    props.hideModal();
  };

  //   SUBMITHANDLER --------------------------------------------
  const submitPhotoHandler = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', 'testwrereå');
    formData.append('file', selectedFile);

    console.log('formData', formData);

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
      console.log('data', data); // just logging resposne for now
    } catch (error) {
      console.log('error', error);
    }

    for (var pair of formData.entries()) {
      console.log('from iterator:', pair[0] + ', ' + pair[1]);
    }

    // axios
    //   .post(UPLOAD_URL, formData)
    //   .then(res => {
    //     alert('File Upload success');
    //   })
    //   .catch(err => alert('File Upload Error'));
  };
  //   ---------------------------------------------

  return (
    <>
      <Modal styles={[classes.modal, classes.card]} hideModal={hideModalHandler}>
        {/* <form onSubmit={submitPhotoHandler}> */}
        <form>
          <FileUploader
            onFileSelectSuccess={file => setSelectedFile(file)}
            onFileSelectError={({ error }) => alert(error)}
          />
          <button onClick={submitPhotoHandler}></button>
        </form>
      </Modal>
    </>
  );
};
export default UpdateProfilPhoto;
