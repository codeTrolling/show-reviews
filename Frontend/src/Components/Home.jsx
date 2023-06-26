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

    const movies = [
        {
            "id": "JohnWick",
            "img": jwick,
            "title": "John Wick",
            "rating": "8,82/10",
            "reviews": "1,115,252",
            "type": "Movie",
            "duration": "1hr 41m",
            "genres": "action, martial arts",
            "pgRating": "13",
            "releaseDate": "2014",
            "description": "D"
        },
        {
            "id": "Interstellar",
            "img": interstellar,
            "title": "Interstellar",
            "rating": "9,71/10",
            "reviews": "931,512",
            "type": "Movie",
            "duration": "2h 49m",
            "genres": "sci-fi, adventure",
            "pgRating": "13",
            "releaseDate": "2014",
            "description": "d"
        },
        {
            "id": "MissionImpossible",
            "img": mimpossible,
            "title": "Mission impossible",
            "rating": "8,32/10",
            "reviews": "1,115,252",
            "type": "Movie",
            "duration": "1hr 41m",
            "genres": "action, martial arts",
            "pgRating": "13",
            "releaseDate": "1996",
            "description": "d"
        },
        {
            "id": "Castle",
            "img": castle,
            "title": "Castle",
            "rating": "7,93/10",
            "reviews": "403,254",
            "type": "TV series",
            "duration": "12ep | 48m",
            "genres": "crime",
            "pgRating": "13",
            "releaseDate": "2009",
            "description": "d"
        },
        {
            "id": "JoJoBizzareAdventurePart1",
            "img": jojo,
            "title": "JoJo's Bizzare Adventure Part 1",
            "rating": "8,1/10",
            "reviews": "952,217",
            "type": "Anime",
            "duration": "24ep | 26m",
            "genres": "action, adventure, supernatural",
            "pgRating": "17",
            "releaseDate": "2011",
            "description": "The year is 1868; English nobleman George Joestar and his son Jonathan become indebted to Dario Brando after being rescued from a carriage incident. What the Joestars don't realize, however, is that Dario had no intention of helping them; he believed they were dead and was trying to ransack their belongings. After Dario's death 12 years later, George—hoping to repay his debt—adopts his son, Dio.\nWhile he publicly fawns over his new father, Dio secretly plans to steal the Joestar fortune. His first step is to create a divide between George and Jonathan. By constantly outdoing his foster brother, Dio firmly makes his place in the Joestar family. But when Dio pushes Jonathan too far, Jonathan defeats him in a brawl.\nYears later, the two appear to be close friends to the outside world. But trouble brews again when George falls ill, as Jonathan suspects that Dio is somehow behind the incident—and it appears he has more tricks up his sleeve."
        }
    ];

    // const [hiddenLeftImageIndex, setHiddenLeftImageIndex] = useState(0);

    // async function changeImageToTheLeft(){
    //     if(hiddenLeftImageIndex !== 0){
    //         setHiddenRightImage(rightImage);
    //         setRightImage(centerImage);
    //         setCenterImage(leftImage);
    //         setLeftImage(hiddenLeftImage);
    //         await setHiddenLeftImageIndex(hiddenLeftImageIndex-1);
            
    //         setHiddenLeftImage(movies[hiddenLeftImageIndex]);
    //         console.log(hiddenLeftImage);
    //         console.log(hiddenLeftImageIndex);
    //     }
    //     else{
    //         setHiddenRightImage(rightImage);
    //         setRightImage(centerImage);
    //         setCenterImage(leftImage);
    //         setLeftImage(hiddenLeftImage);
    //         setHiddenLeftImage(movies[movies.length-1])
    //         setHiddenLeftImageIndex(movies.length - 1);
    //     }
    // }

    const changeImageToTheLeft = () => {
        imageOrderState === 1 ? setImageOrderState(5/*, () => {
            checkImageOrder();
        }*/) : setImageOrderState(imageOrderState - 1/*, () => {
            checkImageOrder();
        }*/);
        // if(imageOrderState2 === 1){
        //     imageOrderState2 = 5;
        // }
        // else{
        //     imageOrderState-=1;
        // }
        //checkImageOrder();
    }

    const changeImageToTheRight = () => {
        imageOrderState === 6 ? setImageOrderState(2/*, () => {
            checkImageOrder();
        }*/) : setImageOrderState(imageOrderState + 1/*, () => {
            checkImageOrder();
        }*/);
        // if(imageOrderState2 === 6){
        //     imageOrderState2 = 2;
        // }
        // else{
        //     imageOrderState2+=1;
        // }
        // imageOrderState = imageOrderState2;
        //checkImageOrder();
    }

    // switch between images. magic values do NOT TOUCH!!!11!
    async function checkImageOrder(){
        if(imageOrderState === 1){
             await setFirstImage([movies[0], 0, "220px", "360px", "1"]);
             await setSecondImage([movies[1], 0, "280px", "420px", "1"]);
             await setThirdImage([movies[2], 0, "220px", "360px"], "1");
             await setFourthImage([movies[3], 0, "220px", "360px", "0"]);
             await setFifthImage([movies[4], -1210, "220px", "360px", "0"]);
             setShowInfoToDisplay(2);
        }
        else if(imageOrderState === 2){
             await setFirstImage([movies[0], -230, "220px", "360px", "0"]);
             await setSecondImage([movies[1], -230, "220px", "360px", "1"]);
             await setThirdImage([movies[2], -230, "280px", "420px", "1"]);
             await setFourthImage([movies[3], -230, "220px", "360px", "1"]);
             await setFifthImage([movies[4], -230, "220px", "360px", "0"]);
             setShowInfoToDisplay(3);
        }
        else if(imageOrderState === 3){
             await setFirstImage([movies[0], 600, "220px", "360px", "0"]);
             await setSecondImage([movies[1], -460, "220px", "360px", "0"]);
             await setThirdImage([movies[2], -460, "220px", "360px", "1"]);
             await setFourthImage([movies[3], -460, "280px", "420px", "1"]);
             await setFifthImage([movies[4], -460, "220px", "360px", "1"]);
             setShowInfoToDisplay(4);
        }
        else if(imageOrderState === 4){
             await setFirstImage([movies[0], 520, "220px", "360px", "1"]);
             await setSecondImage([movies[1], 460, "220px", "360px", "0"]);
             await setThirdImage([movies[2], -690, "220px", "360px", "0"]);
             await setFourthImage([movies[3], -690, "220px", "360px", "1"]);
             await setFifthImage([movies[4], -690, "280px", "420px", "1"]);
             setShowInfoToDisplay(5);
        }
        else if(imageOrderState === 5){
             await setFirstImage([movies[0], 230, "280px", "420px", "1"]);
             await setSecondImage([movies[1], 230, "220px", "360px", "1"]);
             await setThirdImage([movies[2], 230, "220px", "360px", "0"]);
             await setFourthImage([movies[3], -900, "220px", "360px", "0"]);
             await setFifthImage([movies[4], -980, "220px", "360px", "1"]);
             setShowInfoToDisplay(1);
        }
        else{
             await setFirstImage([movies[0], 0, "220px", "360px", "1"]);
             await setSecondImage([movies[1], 0, "280px", "420px", "1"]);
             await setThirdImage([movies[2], 0, "220px", "360px", "1"]);
             await setFourthImage([movies[3], 690, "220px", "360px", "0"]);
             await setFifthImage([movies[4], -1150, "220px", "360px", "0"]);
             setShowInfoToDisplay(2);
        }
        console.log(imageOrderState);
    }


    const [firstImage, setFirstImage] = useState([movies[0], 0, "220px", "360px", "1"]);
    const [secondImage, setSecondImage] = useState([movies[1], 0, "280px", "420px", "1"]);
    const [thirdImage, setThirdImage] = useState([movies[2], 0, "220px", "360px", "1"]);
    const [fourthImage, setFourthImage] = useState([movies[3], 0, "220px", "360px", "0"]);
    const [fifthImage, setFifthImage] = useState([movies[4], 0, "220px", "360px", "0"]);
    const movieImages = [firstImage, secondImage, thirdImage, fourthImage, fifthImage]
    const [imageOrderState, setImageOrderState] = useState(1);
    //var imageOrderState = 1;
    const [showInfoToDisplay, setShowInfoToDisplay] = useState(2);

    useEffect(() => {
        checkImageOrder()
    }, [imageOrderState]);

    return(
    <>
    <div className='flex' style={{position: "sticky"}}>
        <div className='change-image-btn change-left-btn' onClick={() => changeImageToTheLeft(imageOrderState)}></div>
        <div className='flex images-container'>
            {/* <img src={leftImage.img} alt="" className='side-image'/>
            <img src={centerImage.img} alt="" className='center-image'/>
            <img src={rightImage.img} alt="" className='side-image'/>
            <img src={hiddenRightImage.img} alt="" className='side-image'/>
            <img src={hiddenLeftImage.img} alt="" className='side-image'/> */}
            {/*<img src={firstImage.img} alt="" className='center-image'/>*/}
            {movieImages.map((image, index) =>(
                <Link to={"/Show/" + image[0].id} key={index}><img src={image[0].img} style={{transform: "translateX(" + `${image[1]}px`, width: `${image[2]}`, height: `${image[3]}`, opacity: `${image[4]}`}} className='side-image'></img></Link>
            )) }

            {/*imageOrderState === 0 && (<> <img src={firstImage[0].img} style={{transform: "translateX(" + `${image[1]}px`, width: `${index === centerImage ? '280px' : '220px'}`, height: `${index === centerImage ? '420px': '360px'}`}} className='side-image'/> <img/> </>)*/}

        </div>
        <div className='change-image-btn change-right-btn' onClick={() => changeImageToTheRight(imageOrderState)}></div>
    </div>   



    <div className='flex show-info-container'>

        <div className='flex title-container'>
            <label className='text-styling title'>{movies[showInfoToDisplay - 1].title}</label>
        </div>

        <div className='flex details-and-description-container'>
            <div className='flex show-info'>
                <label className='text-styling show-detail'>Rating: {movies[showInfoToDisplay - 1].rating}</label>
                <label className='text-styling show-detail'>Reviews: {movies[showInfoToDisplay - 1].reviews}</label>
                <label className='text-styling show-detail'>Type: {movies[showInfoToDisplay - 1].type}</label>
                <label className='text-styling show-detail'>Duration: {movies[showInfoToDisplay - 1].duration}</label>
                <label className='text-styling show-detail'>Genre: {movies[showInfoToDisplay - 1].genres}</label>
                <label className='text-styling show-detail'>PG rating: {movies[showInfoToDisplay - 1].pgRating}</label>
                <label className='text-styling show-detail'>Release date: {movies[showInfoToDisplay - 1].releaseDate}</label>
            </div>
            <div className='flex show-info'>
                <div className='flex description-heading'> <label className='text-styling heading-text-styling'>Synopsis:</label></div>
                {/* <p className='text-styling description' spellCheck={false}>{movies[showInfoToDisplay - 1].description}</p> */}
                {movies[showInfoToDisplay - 1].description.split("\n").map((i,key) => {
            return <p className='text-styling description' key={key}>{i}</p>;
        })}
            </div>
        </div>

    </div> 
    </>
    )
}

export default Home