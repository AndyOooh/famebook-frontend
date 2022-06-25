import classes from './BackDrop.module.css';

const BackDrop = props => {
  const clickHandler = () => {
    props.onClickBackDrop();
  };
  return <div className={classes.backdrop} onClick={clickHandler}></div>;
};

export default BackDrop;
