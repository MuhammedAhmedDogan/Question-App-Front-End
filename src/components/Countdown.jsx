import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './CountdownStyles.css';

function Countdown({ count, setCount, finalData, setIsDisabled }) {
  const [timer, setTimer] = useState(30);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [finalData]);


  useEffect(() => {
    setTimer(6);
    
    intervalRef.current = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > -1) {
          return prevTimer - 1;
        } else {
          clearInterval(intervalRef.current);
        }
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [count]);


  useEffect(() => {
    if (timer === 6) {
      setIsDisabled(false);
    }
    if (timer === 0) {
      setIsDisabled(true);
    }
    if (timer === -1) {
      setCount(prevCount => prevCount + 1);
    }
  }, [timer, setCount, setIsDisabled])


  return (
    <div><h1>{timer === 0 ? 'Süre Doldu!' : timer}</h1></div>
  )
}

Countdown.propTypes = {
  count: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired,
  finalData: PropTypes.array.isRequired,
  setIsDisabled: PropTypes.func.isRequired
};

export default Countdown