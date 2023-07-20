import '../Styles/multiUse.css';
import { useRef, useState, useEffect } from 'react';
import '../Styles/HomeStyles.css';
import jojo from '../Assets/JoJo_Part_1_Phantom_Blood.jpg';
import interstellar from '../Assets/Interstellar_film_poster.jpg';
import mimpossible from '../Assets/MissionImpossiblePoster.jpg';
import castle from '../Assets/Castle_Season_1.jpg';
import jwick from '../Assets/John_Wick_TeaserPoster.jpg';
import { Link } from 'react-router-dom';

const Home = () => {

    const [movies, setMovies] = useState();

    useEffect(() => {
        fetch("http://localhost:5000/api/shows/randomizedShows").then(r => {
            return r.json();
        }).then(r => {
            if(r.status === 200){
                setMovies(r.shows);
            }
        })
    }, [])

    const changeImageToTheLeft = () => {
        imageOrderState === 1 ? setImageOrderState(5) : setImageOrderState(imageOrderState - 1);
    }

    const changeImageToTheRight = () => {
        imageOrderState === 6 ? setImageOrderState(2) : setImageOrderState(imageOrderState + 1);
    }

    // switch between images. magic values do NOT TOUCH!!!11!
    function checkImageOrder(){
        if(imageOrderState === 1){
             setFirstImage([0, "220px", "360px", "1"]);
             setSecondImage([0, "280px", "420px", "1"]);
             setThirdImage([0, "220px", "360px"], "1");
             setFourthImage([0, "220px", "360px", "0"]);
             setFifthImage([-1210, "220px", "360px", "0"]);
             setShowInfoToDisplay(2);
        }
        else if(imageOrderState === 2){
            setFirstImage([-230, "220px", "360px", "0"]);
            setSecondImage([-230, "220px", "360px", "1"]);
            setThirdImage([-230, "280px", "420px", "1"]);
            setFourthImage([-230, "220px", "360px", "1"]);
            setFifthImage([-230, "220px", "360px", "0"]);
             setShowInfoToDisplay(3);
        }
        else if(imageOrderState === 3){
            setFirstImage([600, "220px", "360px", "0"]);
            setSecondImage([-460, "220px", "360px", "0"]);
            setThirdImage([-460, "220px", "360px", "1"]);
            setFourthImage([-460, "280px", "420px", "1"]);
            setFifthImage([-460, "220px", "360px", "1"]);
             setShowInfoToDisplay(4);
        }
        else if(imageOrderState === 4){
            setFirstImage([520, "220px", "360px", "1"]);
            setSecondImage([460, "220px", "360px", "0"]);
            setThirdImage([-690, "220px", "360px", "0"]);
            setFourthImage([-690, "220px", "360px", "1"]);
            setFifthImage([-690, "280px", "420px", "1"]);
             setShowInfoToDisplay(5);
        }
        else if(imageOrderState === 5){
            setFirstImage([230, "280px", "420px", "1"]);
            setSecondImage([230, "220px", "360px", "1"]);
            setThirdImage([230, "220px", "360px", "0"]);
            setFourthImage([-900, "220px", "360px", "0"]);
            setFifthImage([-980, "220px", "360px", "1"]);
             setShowInfoToDisplay(1);
        }
        else{
            setFirstImage([0, "220px", "360px", "1"]);
            setSecondImage([0, "280px", "420px", "1"]);
            setThirdImage([0, "220px", "360px", "1"]);
            setFourthImage([690, "220px", "360px", "0"]);
            setFifthImage([-1150, "220px", "360px", "0"]);
             setShowInfoToDisplay(2);
        }
    }


    const [firstImage, setFirstImage] = useState([0, "220px", "360px", "1"]);
    const [secondImage, setSecondImage] = useState([0, "280px", "420px", "1"]);
    const [thirdImage, setThirdImage] = useState([0, "220px", "360px", "1"]);
    const [fourthImage, setFourthImage] = useState([0, "220px", "360px", "0"]);
    const [fifthImage, setFifthImage] = useState([0, "220px", "360px", "0"]);
    const movieImages = [firstImage, secondImage, thirdImage, fourthImage, fifthImage]
    const [imageOrderState, setImageOrderState] = useState(1);
    const [showInfoToDisplay, setShowInfoToDisplay] = useState(2);

    useEffect(() => {
        checkImageOrder()
    }, [imageOrderState]);

    return(
    <>
    <div className='flex' style={{position: "sticky"}}>
        <div className='change-image-btn change-left-btn' onClick={() => changeImageToTheLeft(imageOrderState)}></div>
        <div className='flex images-container'>
            {movies !== undefined && movies.map((item, index) =>(
                <Link to={"/Show/" + `${item !== undefined && item.title}`} key={index}><img src={item.image} style={{transform: "translateX(" + `${movieImages[index][0]}px`, width: `${movieImages[index][1]}`, height: `${movieImages[index][2]}`, opacity: `${movieImages[index][3]}`}} className='side-image'></img></Link>
            )) }

        </div>
        <div className='change-image-btn change-right-btn' onClick={() => changeImageToTheRight(imageOrderState)}></div>
    </div>   



    <div className='flex show-info-container'>

        <div className='flex title-container'>
            <label className='text-styling title'>{movies !== undefined && movies[showInfoToDisplay - 1].title}</label>
        </div>

        <div className='flex details-and-description-container'>
            <div className='flex show-info'>
                <label className='text-styling show-detail'>Rating: {movies !== undefined && movies[showInfoToDisplay - 1].rating}</label>
                <label className='text-styling show-detail'>Reviews: {movies !== undefined && movies[showInfoToDisplay - 1].reviewsCount}</label>
                <label className='text-styling show-detail'>Type: {movies !== undefined && movies[showInfoToDisplay - 1].type}</label>
                <label className='text-styling show-detail'>Duration: {movies !== undefined && movies[showInfoToDisplay - 1].duration}</label>
                <label className='text-styling show-detail'>Genre: {movies !== undefined && movies[showInfoToDisplay - 1].genres.map((i, index) => index < movies[showInfoToDisplay - 1].genres.length - 1 ? i + ", " : i)}</label>
                <label className='text-styling show-detail'>PG rating: {movies !== undefined && movies[showInfoToDisplay - 1].pgRating}</label>
                <label className='text-styling show-detail'>Release date: {movies !== undefined && movies[showInfoToDisplay - 1].releaseDate}</label>
            </div>
            <div className='flex show-info'>
                <div className='flex description-heading'> <label className='text-styling heading-text-styling'>Synopsis:</label></div>
                {
                    movies !== undefined && <p className='text-styling description'>{movies[showInfoToDisplay - 1].description}</p>
                }
            </div>
        </div>

    </div> 
    </>
    )
}

export default Home