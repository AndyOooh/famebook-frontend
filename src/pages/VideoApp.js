import { useState, useEffect, useRef } from 'react';

import classes from './VideoApp.module.css';

const VideoApp = () => {
  console.log('VideoApp ----------------------')
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [hasPhoto, setHasPhoto] = useState(false);
  const [image, setImage] = useState(null);

  console.log('image', image);

  const getVideo = async () => {
    console.log('getVid');
    const constraints = { video: { width: 1280, height: 720 } }; //can use  video: {width: { min: 1280 },height: { min: 720 }} to require. If no cam era with this res or higher exists a rejected promise will be returned

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      let video = videoRef.current;
      video.srcObject = stream;
      console.log('video.srcObject2', video.srcObject);
      video.play();
    } catch (error) {
      console.error(error);
    }
  };

  const takePhoto = () => {
    console.log('takePhoto');
    const width = 20 * 16;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0, 0, width, height);
    setImage(photo.toDataURL('image/jpeg'));

    setHasPhoto(true);
  };

  useEffect(() => {
    console.log('useEFf');
    getVideo();
  }, [videoRef]);

  const resultClasses = hasPhoto
    ? `${classes.result} ${classes['has-photo']}`
    : `${classes.result}`;

  return (
    <div className={classes['page-wrapper']}>
      <div className={classes.video}>
        <video ref={videoRef}></video>
        <button onClick={takePhoto}>Capture</button>
      </div>
      <div className={resultClasses}>
        <canvas ref={photoRef}></canvas>
        <button>Close</button>
      </div>
      <div className={classes.image}>
        <p>'image' state variable here:</p>
        <img src={image} alt='' />
      </div>
    </div>
  );
};
export default VideoApp;
