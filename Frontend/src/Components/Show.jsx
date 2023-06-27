import mimpossible from '../Assets/MissionImpossiblePoster.jpg';
import jojo from '../Assets/JoJo_Part_1_Phantom_Blood.jpg';
import '../Styles/multiUse.css';
import '../Styles/ShowStyles.css';
import { useState } from 'react';
import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import Review from './Review';

const Show = () => {

    const movie = {
        "id": "MissionImpossible1",
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
    }

    const reviewsToRender = [{
        "writer-username": "Monkata",
        "writer-image": jojo,
        "rating": "7.32",
        "likes": 312,
        "dislikes": 15,
        "review-text": "i do be reviewing"
    }, {
        "writer-username": "Ivan",
        "writer-image": jojo,
        "rating": "7.63",
        "likes": 3,
        "dislikes": 234236234,
        "review-text": "im better"
    }, {
        "writer-username": "Tonkata",
        "writer-image": jojo,
        "rating": "9.21",
        "likes": 285,
        "dislikes": 25,
        "review-text": "ireviewsing sikjdasmdm "
    }]

    const { show } = useParams();

    const cast = [[mimpossible, "The protagonist?", "Main", "Tom Cruise"], [jojo, "Jonathan Joestar", "Side", "Japanese Person"]]

    const [reviews, setReviews] = useState([]);
    const changeReviewBoxButtonState= useRef([]);
    const reviewsRef = useRef([]);
    const howLongIsTheReviewRef = useRef([]);
    const howBigIsTheReviewersProfile = useRef([]);
    const showImageContainerRef = useRef();
    

    // useEffect(() => {
    //     reviewsRef.current = reviewsRef.current.slice("", reviewsToRender.length);
    //     //setReviews(...reviews, "300px");
    //  }, [reviewsToRender]);

    const changeReviewBoxSize = (index) => {
        // what was i doing with this???? even if it works?????????????
        // if(changeReviewBoxButtonState[index] != true){

        // }
        // if(changeReviewBoxButtonState[index] === undefined){
        //     let temp = changeReviewBoxButtonState;
        //     temp[index] = true;
        //     setChangeReviewButtonState(temp);
        // } 
        console.log(reviewsRef);
        console.log(reviewsRef.current);
        console.log(reviewsRef.current[index]);
        console.log(reviewsRef.current[index].style.height);
        console.log("this is text", howLongIsTheReviewRef.current[index].offsetHeight)
        console.log(changeReviewBoxButtonState)
        if(reviewsRef.current[index].style.height === "300px"){
            // let temp = reviews;
            // temp[index] = "auto";
            // let temp = howBigIsTheReviewersProfile.current[index].offsetHeight;
            // let temp2 = howLongIsTheReviewRef.current[index].offsetHeight;
            // temp = temp.split("px")[0];
            // temp2 = temp2.split("px")[0];
            reviewsRef.current[index].style.height = howBigIsTheReviewersProfile.current[index].offsetHeight + howLongIsTheReviewRef.current[index].offsetHeight + 50 + "px";
            // let temp = changeReviewBoxButtonState;
            // temp[index] = false;
            // setChangeReviewButtonState(temp);
            changeReviewBoxButtonState.current[index].textContent = "Read less";
        }
        else{
            // let temp = reviews;
            // temp[index] = "300px";
            reviewsRef.current[index].style.height = "300px";
            // let temp = changeReviewBoxButtonState;
            // temp[index] = true;
            // setChangeReviewButtonState(temp);
            changeReviewBoxButtonState.current[index].textContent = "Read more";
        }
    }


    return(
        <>
        <div className='flex viewport-container'>
            <div className='flex image-and-cast-container' ref={showImageContainerRef}>
                <img src={mimpossible} alt="" className='show-image'/>
                <div className='flex main-cast-heading'> <label className='text-styling heading-text-styling' style={{fontSize: "1.15rem"}}>Main cast:</label> </div>
                {
                    cast.map((character, key) => {
                        return (
                        <div key={key} className='flex character-actor-container'>
                            <img src={character[0]} alt="" className='character-image'/>
                            <label className='text-styling character-name'>{character[1]},<br/>{character[2]}</label>
                            <label className='text-styling actor-name'>{character[3]},<br/>Actor</label>
                        </div>
                    )})
                }
            </div>

            <div className='flex show-show-info'>
                <div className='flex show-title'> <label className='text-styling heading-text-styling' style={{fontSize: "1.2rem"}}>{movie.title}</label></div>
                <div className='flex major-info-container'>
                    <div className='flex major-info'>
                        <label className='text-styling info-category'>Rating:</label>
                        <label className='text-styling heading-text-styling major-score-in-category'>{movie.rating}</label>
                    </div>
                    <div className='flex major-info'>
                        <label className='text-styling info-category'>Rank:</label>
                        <label className='text-styling heading-text-styling major-score-in-category'>{"#Some number"}</label>
                    </div>
                    <div className='flex major-info'>
                        <label className='text-styling info-category'>Reviews:</label>
                        <label className='text-styling heading-text-styling major-score-in-category'>{movie.reviews}</label>
                    </div>
                    <div className='flex major-info'>
                        <label className='text-styling info-category'>Popularity:</label>
                        <label className='text-styling heading-text-styling major-score-in-category'>{"#Some number"}</label>
                    </div>
                </div>

                <div className='flex minor-info-container'>
                    <div className='flex minor-info'>
                        <label className='text-styling info-category'>Genres:</label>
                        <label className='text-styling minor-score-in-caregory'>{movie.genres}</label>
                    </div>
                    <div className='flex minor-info'>
                        <label className='text-styling info-category'>Duration:</label>
                        <label className='text-styling minor-score-in-caregory'>{movie.duration}</label>
                    </div>
                    <div className='flex minor-info'>
                        <label className='text-styling info-category'>PG rating:</label>
                        <label className='text-styling minor-score-in-caregory'>{movie.pgRating}</label>
                    </div>
                    <div className='flex minor-info'>
                        <label className='text-styling info-category'>Release date:</label>
                        <label className='text-styling minor-score-in-caregory'>{movie.releaseDate}</label>
                    </div>
                </div>

                <div className='flex additional-info-redirect-options-container'>
                    <label className='text-styling additional-info-redirect-options'>Type: {movie.type}</label>
                    <label className='text-styling additional-info-redirect-options'>Write reviews</label>
                    <label className='text-styling additional-info-redirect-options'>Read reviews</label>
                </div>

                <div className='flex' style={{flexDirection: "column", borderTop: "solid 2px rgb(15, 15, 15)", marginTop: "13px", paddingTop: "2px"}}>
                    <div className='flex description-heading'> <label className='text-styling heading-text-styling'>Synopsis:</label></div>
                    {movie.description.split("\n").map((i,key) => {
                        return <p className='text-styling description' key={key}>{i}</p>;
                    })}
                </div>

                <div className='flex description-heading'> <label className='text-styling heading-text-styling'>Reviews:</label></div>
                    <div className='flex show-review-container'>
                        <div className='flex review-writer'>
                            <img src={jojo} alt="" className='review-writer-image'/>
                            <label className='text-styling review-writer-username'>This is my name</label>
                            <div className='like-review-button'></div>
                            <div className='dislike-review-button'></div>
                        </div>
                        <p className='text-styling review-text'>{"This is my favorite series ever, and it finally got a real weekly anime adaptation after 25 years—the ‘94 and ‘00 OVAs and the Phantom Blood movie, which never saw DVD/home video release do not count—there is definitely some bias in this review. That said, there’s a reason I still didn’t give it a perfect score, and it’s because I’m still trying to keep a hint of objectivity in here.\n\nArt - 8/10\n\nI suppose I’ll start off with how it adapted the source material. Unlike the OVAs and Phantom Blood movie, there were no cuts in content, and it actually adapted parts 1 and 2 of the manga: Phantom Blood and Battle Tendency. The studio, David Production, did what I would consider a masterful job in terms of bringing out Araki Hirohiko’s style into the manga. He is an artist, and you can see his art evolve throughout the long-running JoJo’s Bizarre Adventure franchise. DP hired multiple art directors and tried to incorporate the different faces and builds in body throughout the series. Also, because there is no such thing as “canon” colors for characters, DP, in an unexpected but very innovative manner, used their poor budget to their advantage—by changing color schemes and using colorful abstract backgrounds during monologues and still-frames. I’ll give the art by itself a 10/10, even though sometimes Jonathan and Joseph, the titular JoJos in this series, suffer from Gorilla Face Syndrome, since the BD/DVDs are doing a great job of fixing it."}</p>
                        <div className='flex more-or-less-btn-container'><button className='text-styling more-or-less-btn'>Read more</button></div>
                    </div>
                    {/* {
                        reviewsToRender.map((item, index) => {
                            //reviewsRef.current[index] = "";
                            //setReviews(...reviews, "300px")
                            // if(changeReviewBoxButtonState[index] === undefined){ 
                            //     let temp = changeReviewBoxButtonState;
                            //     temp[index] = true;
                            //     setChangeReviewButtonState(temp);
                            // }
                            return(
                                <div key={index} ref={e => reviewsRef.current[index] = e} className='flex show-review-container' style={{height: `${reviews[index] != null ? reviews[index] : "300px"}`, minHeight: "300px"}}>
                                    <div ref={e => howBigIsTheReviewersProfile.current[index] = e} className='flex review-writer'>
                                        <img src={item['writer-image']} alt="" className='review-writer-image'/>
                                        <label className='text-styling review-writer-username'>{item['writer-username']}</label>
                                        <label className='text-styling review-writer-rating'>{"Rating: " + item.rating + "/10"}</label>
                                        <div className='like-review-button'></div>
                                        <div className='dislike-review-button'></div>
                                    </div>
                                    <p className='text-styling review-text' ref={e => howLongIsTheReviewRef.current[index] = e}>{"This is my favorite series ever, and it finally got a real weekly anime adaptation after 25 years—the ‘94 and ‘00 OVAs and the Phantom Blood movie, which never saw DVD/home video release do not count—there is definitely some bias in this review. That said, there’s a reason I still didn’t give it a perfect score, and it’s because I’m still trying to keep a hint of objectivity in here.\n\nArt - 8/10\n\nI suppose I’ll start off with how it adapted the source material. Unlike the OVAs and Phantom Blood movie, there were no cuts in content, and it actually adapted parts 1 and 2 of the manga: Phantom Blood and Battle Tendency. The studio, David Production, did what I would consider a masterful job in terms of bringing out Araki Hirohiko’s style into the manga. He is an artist, and you can see his art evolve throughout the long-running JoJo’s Bizarre Adventure franchise. DP hired multiple art directors and tried to incorporate the different faces and builds in body throughout the series. Also, because there is no such thing as “canon” colors for characters, DP, in an unexpected but very innovative manner, used their poor budget to their advantage—by changing color schemes and using colorful abstract backgrounds during monologues and still-frames. I’ll give the art by itself a 10/10, even though sometimes Jonathan and Joseph, the titular JoJos in this series, suffer from Gorilla Face Syndrome, since the BD/DVDs are doing a great job of fixing it."}</p>
                                    <div className='flex more-or-less-btn-container'><button ref={e => changeReviewBoxButtonState.current[index] = e} onClick={() => changeReviewBoxSize(index)} className='text-styling more-or-less-btn'>Read more</button></div>
                                </div>
                            )
                        })
                    } */}

                    <Review reviewsToRender={reviewsToRender} howRightToGo={showImageContainerRef}></Review>

            </div>
        </div>
        </>
    );
}

export default Show