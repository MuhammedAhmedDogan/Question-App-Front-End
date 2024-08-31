import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './CountdownStyles.css';

function Countdown({ count, setCount, finalData, setIsDisabled }) {
  const [timer, setTimer] = useState(30);
  const [percentage, setPercentage] = useState(0);
  const intervalRef = useRef(null);
  const animationRef  = useRef(null);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      cancelAnimationFrame(animationRef .current);
    }
  }, [finalData]);


  useEffect(() => {
    setTimer(30);

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
    setPercentage(0);
    let start;
    
    function updatePercentage(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      if (elapsed < 30000) {
        setPercentage((elapsed / 30000) * 360);
        animationRef.current = requestAnimationFrame(updatePercentage);
      } else {
        setPercentage(360);
        cancelAnimationFrame(animationRef.current);
      }
    }

    animationRef.current = requestAnimationFrame(updatePercentage);

    return () => cancelAnimationFrame(animationRef.current);
  }, [count]);


  useEffect(() => {
    if (timer === 30) {
      setIsDisabled(false);
    }
    if (timer === 0) {
      setIsDisabled(true);
    }
    if (timer === -1) {
      setCount(prevCount => prevCount + 1);
    }
  }, [timer, setCount, setIsDisabled]);

  
  const gradientStyle = {
    background: `conic-gradient(#ff3030 ${percentage}deg, #7cfc00 0deg)`
  };


  return (
    <div className='countdown'>
      <div className='frame' style={gradientStyle}></div>
      <h1>{timer === 0 ? 'Süre Doldu!' : timer}</h1>
      </div>
  )
}

Countdown.propTypes = {
  count: PropTypes.number.isRequired,
  setCount: PropTypes.func.isRequired,
  finalData: PropTypes.array.isRequired,
  setIsDisabled: PropTypes.func.isRequired
};

export default Countdown