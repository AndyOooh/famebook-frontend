import { useState, useEffect } from 'react';

import classes from './Countdown.module.css';

import AddCountdown from '../components/Countdown/AddCountdown';
import Counter from '../components/Countdown/Counter';

const Countdown = props => {
  const [event, setEvent] = useState({
    name: '',
    location: '',
    date: new Date(),
    secondsTillEvent: null,
  });

  useEffect(() => {
    const fetchedDate = localStorage.getItem('date')
      ? new Date(localStorage.getItem('date'))
      : new Date();
    setEvent({
      name: localStorage.getItem('event'),
      location: localStorage.getItem('location'),
      date: fetchedDate,
      secondsTillEvent: (fetchedDate - new Date()) / 1000,
    });
  }, []);

  const getEventHandler = (eventName, eventLocation, eventDate) => {
    // should't this be setEventHandler?
    const date = new Date(eventDate);
    setEvent({
      name: eventName,
      location: eventLocation,
      date: date,
      secondsTillEvent: (date - new Date()) / 1000,
    });
    localStorage.setItem('event', eventName);
    localStorage.setItem('event', eventLocation);
    localStorage.setItem('date', date);
  };

  useEffect(() => {
    if (event.name) {
      setTimeout(() => {
        setEvent(prevState => {
          return { ...prevState, secondsTillEvent: prevState.secondsTillEvent - 1 };
        });
      }, 1000);
    }
    return;
  });

  return (
    <div className={classes['countdownapp-wrapper']}>
      <AddCountdown getEvent={getEventHandler} />
      <Counter event={event} />
    </div>
  );
};
export default Countdown;
