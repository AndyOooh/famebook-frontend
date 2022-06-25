// import { forwardRef, useRef } from 'react';

import classes from './Input.module.css';

const Input = props => {

  // console.log('props', props)
  const inputClasses = props.extraClasses
    ? `${classes.input} ${props.extraClasses.join(' ')}`
    : `${classes.input}`;

  return (
    <div className={inputClasses}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input}></input>
    </div>
  );
};

export default Input;
