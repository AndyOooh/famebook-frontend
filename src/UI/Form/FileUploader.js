import { useRef } from 'react';

const FileUploader = props => {
  const fileInput = useRef(null);

  const fileInputHandler = e => {
    e.preventDefault();
    // handle validations

    console.log('fileInput', fileInput);
    const file = e.target.files[0];
    console.log('file', file);

    if (file.size > 1000 * 1000)
      props.onFileSelectError({ error: 'File size cannot exceed 1MB' });
    else props.onFileSelectSuccess(file);
  };

  return (
    <div className='file-uploader'>
      <input type='file' onChange={fileInputHandler} />
      <button
        onClick={e => fileInput.current && fileInput.current.click()}
        className='btn btn-primary'
      />
    </div>
  );
};

export default FileUploader;
