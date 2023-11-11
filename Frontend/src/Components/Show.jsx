import mimpossible from '../Assets/MissionImpossiblePoster.jpg';
import jojo from '../Assets/JoJo_Part_1_Phantom_Blood.jpg';
import '../Styles/multiUse.css';
import '../Styles/ShowStyles.css';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Review from './Review';

const Show = () => {

    const showImageContainerRef = useRef();
    const [movie, setMovie] = useState();
    const [redirect, setRedirect] = useState(false);
    const [reviewsToRender, setReviewsToRender] = useState();
    const [likedReviews, setLikedReviews] = useState();
    const [dislikedReviews, setDislikedReviews] = useState();

    const { show } = useParams();

    useEffect(() => {
        fetch("http://localhost:5000/api/shows/getShow/" + show.toString()).then(r => {
        return r.json()
    }).then(r => {
        if(r !== null){
            setMovie(r)
        }
        else{
            setRedirect(true)
        }
    })
    }, [])


    // get reviews for this page
    useEffect(() => {
        fetch("http://localhost:5000/api/reviews/showReviews", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "title": show,
                "sessionId": sessionStorage.getItem("sessionId")
            })
        }).then(r => {
            return r.json();
        }).then(r => {
            if(r.status === 200){
                setReviewsToRender(r.reviews);
                setLikedReviews(r.likedReviews);
                setDislikedReviews(r.dislikedReviews);
            }
        })
    }, [])

    return(
        <>
        {
            redirect && <Navigate to="/AllShows" replace/>
        }
        <div className='flex viewport-container'>
            <div className='flex image-and-cast-container' ref={showImageContainerRef}>
                <img src={ movie !== undefined ? movie.image : ""} alt="" className='show-image'/>
                <div className='flex main-cast-heading'> <label className='text-styling heading-text-styling' style={{fontSize: "1.15rem"}}>Main cast:</label> </div>
                {
                    movie !== undefined ? movie.mainCast.map((character, key) => {
                        return (
                        <div key={key} className='flex character-actor-container'>
                            <img src={character.image} alt="" className='character-image'/> {/* character[0] then 1 2 3 */}
                            <label className='text-styling character-name'>{character.characterName},<br/>{character.mainCharacter ? "Main" : "Side"}</label>
                            <label className='text-styling actor-name'>{character.actorName},<br/>Actor</label>
                        </div>
                    )}) : <div></div>
                }
            </div>

            <div className='flex show-show-info'>
                <div className='flex show-title'> <label className='text-styling heading-text-styling' style={{fontSize: "1.2rem"}}>{movie !== undefined && movie.title}</label></div>
                <div className='flex major-info-container'>
                    <div className='flex major-info'>
                        <label className='text-styling info-category'>Rating:</label>
                        <label className='text-styling heading-text-styling major-score-in-category' style={{textAlign: "center"}}>{movie !== undefined && movie.rating}</label>
                    </div>
                    <div className='flex major-info'>
                        <label className='text-styling info-category'>Rank:</label>
                        <label className='text-styling heading-text-styling major-score-in-category'>{"#Some number"}</label>
                    </div>
                    <div className='flex major-info'>
                        <label className='text-styling info-category'>Reviews:</label>
                        <label className='text-styling heading-text-styling major-score-in-category' style={{textAlign: "center"}}>{movie !== undefined && movie.reviewsCount}</label>
                    </div>
                    <div className='flex major-info'>
                        <label className='text-styling info-category'>Popularity:</label>
                        <label className='text-styling heading-text-styling major-score-in-category'>{"#Some number"}</label>
                    </div>
                </div>

                <div className='flex minor-info-container'>
                    <div className='flex minor-info'>
                        <label className='text-styling info-category'>Genres:</label>
                        <label className='text-styling minor-score-in-caregory'>{movie !== undefined && movie.genres.map((i, index) => index < movie.genres.length - 1 ? i + ", " : i )}</label>
                    </div>
                    <div className='flex minor-info'>
                        <label className='text-styling info-category'>Duration:</label>
                        <label className='text-styling minor-score-in-caregory'>{movie !== undefined && movie.duration}</label>
                    </div>
                    <div className='flex minor-info'>
                        <label className='text-styling info-category'>PG rating:</label>
                        <label className='text-styling minor-score-in-caregory'>{movie !== undefined && movie.pgRating}</label>
                    </div>
                    <div className='flex minor-info'>
                        <label className='text-styling info-category'>Release date:</label>
                        <label className='text-styling minor-score-in-caregory'>{movie !== undefined && movie.releaseDate}</label>
                    </div>
                </div>

                <div className='flex additional-info-redirect-options-container'>
                    <Link to={"/AllShows/" + `${movie !== undefined && movie.type}`} className='text-styling additional-info-redirect-options'>Type: {movie !== undefined && movie.type}</Link>
                    <Link to={"/WriteReview/" + `${movie !== undefined && movie.title}`} className='text-styling additional-info-redirect-options'>Write review</Link>
                    <Link to={"/Show/" + show + "/reviews/1"} className='text-styling additional-info-redirect-options'>Read reviews</Link>
                </div>

                <div className='flex' style={{flexDirection: "column", borderTop: "solid 2px rgb(15, 15, 15)", marginTop: "13px", paddingTop: "2px"}}>
                    <div className='flex description-heading'> <label className='text-styling heading-text-styling'>Synopsis:</label></div>
                    {movie !== undefined && movie.description.split("\n").map((i,key) => {
                        return <p className='text-styling description' key={key}>{i}</p>;
                    })}
                </div>

                <div className='flex description-heading'> <label className='text-styling heading-text-styling'>Reviews:</label></div>

                    { reviewsToRender !== undefined ? <Review reviewsToRender={reviewsToRender} likedReviews={likedReviews} dislikedReviews={dislikedReviews}></Review> : <p className='text-styling' style={{margin: "15px auto"}}>There are no reviews yet. Be the first person to submit one!</p>}

            </div>
        </div>
        </>
    );
}

export default Show