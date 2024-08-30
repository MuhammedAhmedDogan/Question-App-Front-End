import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './QuestionsStyles.css';

function Questions({ count, setCount, finalData, setFinalData, isDisabled, setIsDisabled }) {
    const [showOptions, setShowOptions] = useState(false);
    const [optionsTimer, setOptionsTimer] = useState(4);

    function handleClick(option, item) {
        setIsDisabled(true);
        if (option === item.answer) {
            document.getElementById(option).style.backgroundColor = '#00ff00';
        } else {
            document.getElementById(option).style.backgroundColor = '#ff0000'
            document.getElementById(item.answer).style.backgroundColor = '#00ff00'
        }

        setFinalData(prevData =>
            prevData.map(finalItem =>
                finalItem.id === item.id ? { ...finalItem, selectedOption: option } : finalItem
            )
        );

        setTimeout(() => {
            setCount(prevCount => prevCount + 1);
            setIsDisabled(false);
        }, 1000);
    }

    useEffect(() => {
        setShowOptions(false);
        setOptionsTimer(4);
        const countdown = setInterval(() => {
            setOptionsTimer(prevOptionsTimer => {
                if (prevOptionsTimer > 1) {
                    return prevOptionsTimer - 1;
                } else {
                    clearInterval(countdown);
                    setShowOptions(true);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [count]);

    const item = finalData.find(item => item.id === count);
    if (item) {
        return (
            <div className='questions-page'>
                {
                    <div className='question-card'>
                        <img src={item.media} alt="question" />
                        <h1 className='question'>{item.id+ ' - '+item.question}</h1>
                        {showOptions ? (<div className='options'>
                            {item.options.map((option, index) => (
                                <div key={index}><button id={option} onClick={() => handleClick(option, item)} disabled={isDisabled}>{option}</button></div>
                            ))}
                        </div>) : (<div className='countdown'>
                            <p>Cevap şıkları <span>{optionsTimer}</span> saniye sonra açılacak.</p>
                        </div>)}
                    </div>
                }
            </div>
        )
    }
}

Questions.propTypes = {
    count: PropTypes.number.isRequired,
    setCount: PropTypes.func.isRequired,
    finalData: PropTypes.array.isRequired,
    setFinalData: PropTypes.func.isRequired,
    isDisabled: PropTypes.bool.isRequired,
    setIsDisabled: PropTypes.func.isRequired
};

export default Questions;