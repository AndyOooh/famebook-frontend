import classes from './EditProfile.module.css';
import Input from '../UI/Form/Input/Input';
import VideoApp from './VideoApp';

const EditProfile = () => {
  return (
    <>
      <h1>Edit profile page</h1>
      {/* <Input
        input={{
          id: 'image',
          type: 'file',
          control: 'input', //what is this property?
          // accept: '.jpg, .jpeg, .gif, .svg, .png', //could also accept="image/*,.pdf" all image and pdf files
          accept: 'image/*', //could also accept="image/*,.pdf" all image and pdf files
          capture: 'camera',
          // capture: 'environment '
        }}
      />
      <input type='file' capture='user'></input> */}
      <VideoApp />
    </>
  );
};
export default EditProfile;

// OK. I manage to resolve my issue by using navigator and getting media device from there to use. For anyone else who is trying to make something like this, I want you to know that Chrome doesn't allow you to use this before you set your web app to use secure connection HTTPS. In react for testing use set HTTPS=true&&npm start, so you'll start your react app as https and it will show you camera and you can put it anywhere in your component's html tags.

{
  /* <FilePicker
  id='image'
  label='Image'
  control='input'
  onChange={this.postInputChangeHandler}
  onBlur={this.inputBlurHandler.bind(this, 'image')}
  valid={this.state.postForm['image'].valid}
  touched={this.state.postForm['image'].touched}
/>; */
}
