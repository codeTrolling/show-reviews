import jojo from '../Assets/JoJo_Part_1_Phantom_Blood.jpg';
import jwick from '../Assets/John_Wick_TeaserPoster.jpg';
import mimpossible from '../Assets/MissionImpossiblePoster.jpg';
import interstellar from '../Assets/Interstellar_film_poster.jpg';
import castle from '../Assets/Castle_Season_1.jpg';
import '../Styles/LoginRegisterBackgroundStyles.css';

const LoginRegisterBackground = () => {
    const images = [jojo, jwick, mimpossible, interstellar, castle, jojo, jwick, mimpossible, interstellar, castle];
    return(
        
        <div className='background-images-container'>
        {
            images.map((img, index) => {
                return(
                    <img key={index} src={img} alt="" className='background-image' style={{top: Math.floor(Math.random() * 90) + "%", left: Math.floor(Math.random() * 90) +"%"}}/>
                )
            })
        }
        </div>
        
    )
}

export default LoginRegisterBackground