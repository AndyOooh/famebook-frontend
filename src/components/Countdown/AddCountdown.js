import { useState } from 'react';

import classes from './AddCountdown.module.css';

import Card from '../../UI/Card/Card';

const AddCountdown = props => {
  const [eventName, setEventName] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventDate, setEventDate] = useState(new Date());

  const eventNameHandler = event => {
    setEventName(event.target.value);
  };

  const eventLocationHandler = event => {
    setEventLocation(event.target.value);
  };

  const eventDateHandler = event => {
    setEventDate(event.target.value);
  };

  const addEventHandler = event => {
    event.preventDefault();
    props.getEvent(eventName, eventLocation, eventDate);
    setEventName('');
    setEventLocation('');
    setEventDate(new Date());
  };

  return (
    <Card extraClasses={[classes.card]}>
      <form className={classes.form} onSubmit={addEventHandler}>
        <label htmlFor='event'>Event Name</label>
        <input id='event' type='text' onChange={eventNameHandler} value={eventName}></input>
        <label htmlFor='location'>Location</label>
        <input id='location' type='text' onChange={eventLocationHandler} value={eventName}></input>
        <label htmlFor='date'>Date</label>
        <input
          id='date'
          type='datetime-local'
          onChange={eventDateHandler}
          value={eventDate}
        ></input>
        <button type='button'>Add countdown</button>
      </form>
    </Card>
  );
};
export default AddCountdown;
