import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import Review from './Review';

const ShowReviews = () => {
    const [movie, setMovie] = useState();
    const { show } = useParams();
    const [redirect, setRedirect] = useState(false);
    const [reviewsToRender, setReviewsToRender] = useState(undefined);
    const [likedReviews, setLikedReviews] = useState();
    const [dislikedReviews, setDislikedReviews] = useState();
    const { page = 1 } = useParams();

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

    useEffect(() => {
        fetch("http://localhost:5000/api/reviews/showReviews", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "title": show,
                "page": page,
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
    }, [page])


    return (
        <>
        {
            redirect && <Navigate to="/AllShows" replace/>
        }
        <div className='flex viewport-container'>
            <div className='flex image-and-cast-container'>
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
                <div className='flex description-heading'> <label className='text-styling heading-text-styling'>Reviews:</label></div>
                { reviewsToRender !== undefined ? <Review reviewsToRender={reviewsToRender} likedReviews={likedReviews} dislikedReviews={dislikedReviews}></Review> : <p className='text-styling' style={{margin: "15px auto"}}>There are no reviews yet. Be the first person to submit one!</p>}

                <div className="flex" style={{margin: "0 auto"}}>

                {/* change pages. using a tag instead of link to cause a re-render allowing a new fetch to occur */}
                {
                    parseInt(page) - 1 >= 1 && <a href={"/Show/" + show + "/reviews/" + (parseInt(page) - 1).toString()} className="text-styling" style={{marginRight: "50px"}}>Previous page</a>
                }
                {
                    reviewsToRender !== undefined && reviewsToRender.length >= 10 && <a href={"/Show/" + show + "/reviews/" + (parseInt(page) + 1).toString()} className="text-styling">Next page</a>
                }
            </div>
            </div>
            
        </div>
        </>
    )
}

export default ShowReviews;