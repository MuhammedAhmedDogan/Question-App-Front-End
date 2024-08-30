import PropTypes from 'prop-types';
import './StartScreenStyles.css'

function StartScreen({ setCount }) {
    return (
        <div className='start-screen'>
            <h1>Hoş geldiniz!</h1>
            <h2>
                Bu test, genel kültür bilginizi ölçmek ve eğlenceli bir deneyim sunmak için ilginç bilgiler ile hazırlandı.
                Toplamda 10 soru sorulacak ve her soruya cevap vermek 30 saniye süreniz olacak.
                Hazırsanız, başlayalım!
            </h2>
            <h1>Bol şans!</h1>
            <button id="start" onClick={() => setCount(1)}>Teste Başla</button>
        </div>
    )
}

StartScreen.propTypes = {
    setCount: PropTypes.func.isRequired,
};

export default StartScreen