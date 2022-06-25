import { useRef } from 'react';

import classes from './FileUploader.module.css';

const FileUploader = props => {
  const fileInputRef = useRef(null);

  const fileInputHandler = e => {
    e.preventDefault();
    // handle validations

    const file = e.target.files[0];

    file.size > 1000 * 1000
      ? props.onFileSelectError({ error: 'File size cannot exceed 1MB' })
      : props.onFileSelectSuccess(file);
  };

  return (
    <label className={classes['filepicker-label']} htmlFor='file'>
      Choose image from file
      <input
        className={classes['file-picker']}
        id='file'
        type='file'
        name='file'
        ref={fileInputRef}
        onChange={fileInputHandler}
      />
    </label>
  );
};

export default FileUploader;
