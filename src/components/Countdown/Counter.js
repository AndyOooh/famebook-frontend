import classes from './Counter.module.css';

import Card from '../../UI/Card/Card';

const Counter = props => {
  console.log('render Counter');
  // const date = props.event.date.toDateString() + props.event.date.toTimeString();
  // const date = props.event.date.toLocaleString()
  const date = props.event.date.toDateString();
  const time = props.event.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  let seconds = props.event.secondsTillEvent;

  const days = Math.floor(seconds / (60 * 60 * 24));
  seconds = seconds - days * 60 * 60 * 24;

  const hours = Math.floor(seconds / (60 * 60));
  seconds = seconds - hours * 60 * 60;

  const minutes = Math.floor(seconds / 60);
  seconds = Math.round(seconds - minutes * 60);

  return (
    <Card extraClasses={[classes.card]}>
      <h1>{props.event.name ? props.event.name : 'Today is' }</h1>
      <h2>{date} <span> at {time}</span></h2>
      <div className={classes.timer}>
        <div className={classes['wrapper-left']}>
          <div className={classes.number}>{days}</div>
          <div className={classes.letter}>Days</div>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.number}>{hours}</div>
          <div className={classes.letter}>Hours</div>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.number}>{minutes}</div>
          <div className={classes.letter}>Minutes</div>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.number}>{seconds}</div>
          <div className={classes.letter}>Seconds</div>
        </div>
      </div>
    </Card>
  );
};
export default Counter;
