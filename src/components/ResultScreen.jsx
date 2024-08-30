import PropTypes from 'prop-types';
import './ResultScreenStyles.css'

function ResultScreen({ finalData }) {
    return (
        <div className='result-screen'>
            {finalData.map(item => (
                <div key={item.id} className='result-card'>
                    <h1>{item.selectedOption}</h1>
                    <div></div>
                </div>
            ))}
        </div>
    )
}

ResultScreen.propTypes = {
    finalData: PropTypes.array.isRequired
};

export default ResultScreen