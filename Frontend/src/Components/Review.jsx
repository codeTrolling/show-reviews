import { useState, useRef, useEffect } from "react";
import pic from "../Assets/instagramLogo.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Review = ( {reviewsToRender, likedReviews, dislikedReviews} ) => {

    //TODO maybe rewrite the code to use states instead of refs
    const [reviews, setReviews] = useState([]); // i think this is useless currently and could easily be remade
    const changeReviewBoxButtonState= useRef([]);
    const reviewsRef = useRef([]);
    const howLongIsTheReviewRef = useRef([]);
    const howBigIsTheReviewersProfile = useRef([]);
    const [likeButtonPopUpWindow, setLikeButtonPopUpWindow] = useState([]);
    const [dislikeButtonPopUpWindow, setDislikeButtonPopUpWindow] = useState([]);
    const [likeTopAndLeft, setLikeTopAndLeft] = useState([]);
    const [dislikeTopAndLeft, setDislikeTopAndLeft] = useState([]);
    const likeButtonRef = useRef([]);
    const dislikeButtonRef = useRef([]);
    const likeButtonWindowPopUpRef = useRef();
    const dislikeButtonWindowPopUpRef = useRef();
    const { page=1 } = useParams();
    const [history, setHistory] = useState();
    if(page !== history){
        setHistory(page);
    }
    const navigate = useNavigate();

    const [likedOrDislikedAReview, setLikedOrDislikedAReview] = useState(false);

    const changeReviewBoxSize = (index) => {
        if(reviewsRef.current[index].offsetHeight <= 330){
            reviewsRef.current[index].style.maxHeight = "";
            reviewsRef.current[index].style.height = howBigIsTheReviewersProfile.current[index].offsetHeight + howLongIsTheReviewRef.current[index].offsetHeight + 50 + "px";
            changeReviewBoxButtonState.current[index].textContent = "Read less";
        }
        else{
            reviewsRef.current[index].style.maxHeight = "";
            reviewsRef.current[index].style.height = howBigIsTheReviewersProfile.current[index].offsetHeight + howLongIsTheReviewRef.current[index].offsetHeight + 50 <=300 ? howBigIsTheReviewersProfile.current[index].offsetHeight + howLongIsTheReviewRef.current[index].offsetHeight + 50 + "px" : "300px";
            changeReviewBoxButtonState.current[index].textContent = "Read more";
        }
    }

    
    useEffect(() => {
        // remove "read more" buttons if the review isn't big enough to need them. also change review box size to only fit the review if needed.
        const testNoName = (index) => {
            if(reviewsRef.current[index].children[2] !== undefined && reviewsRef.current[index].offsetHeight > howBigIsTheReviewersProfile.current[index].offsetHeight + howLongIsTheReviewRef.current[index].offsetHeight + 50){
                changeReviewBoxButtonState.current[index].style.display = "none";
                changeReviewBoxButtonState.current[index].style.pointerEvents = "none";
                reviewsRef.current[index].style.height = howBigIsTheReviewersProfile.current[index].offsetHeight + howLongIsTheReviewRef.current[index].offsetHeight + 50 + "px";
            }
            else{
                changeReviewBoxButtonState.current[index].style.display = "block";
                changeReviewBoxButtonState.current[index].style.pointerEvents = "auto";
                reviewsRef.current[index].style.height = "300px"
            }
        }

        reviewsToRender.map((item, index) => {
            testNoName(index);
        })
    }, [history])

    useEffect(() => {
        // responsible for bringing the like pop up window to the correct like button
        const ifFuncInEffect = () => {
            if(likeButtonPopUpWindow[1] !== undefined){
                let temp = [likeButtonRef.current[likeButtonPopUpWindow[1]].getBoundingClientRect().y, likeButtonRef.current[likeButtonPopUpWindow[1]].getBoundingClientRect().x]
                setLikeTopAndLeft([temp[0] + window.scrollY - 35 + "px", temp[1] - 30 + "px"])
            }
        }
        ifFuncInEffect();
    }, [likeButtonPopUpWindow])

    useEffect(() => {
        // responsible for bringing the dislike pop up window to the correct dislike button
        const ifFuncInEffect = () => {
            if(dislikeButtonPopUpWindow[1] !== undefined){
                let temp = [dislikeButtonRef.current[dislikeButtonPopUpWindow[1]].getBoundingClientRect().y, dislikeButtonRef.current[dislikeButtonPopUpWindow[1]].getBoundingClientRect().x]
                setDislikeTopAndLeft([temp[0] + window.scrollY - 35 + "px", temp[1] - 30 + "px"])
            }
        }
        ifFuncInEffect();
    }, [dislikeButtonPopUpWindow])

    //called when a user clicks the like button on a review
    const userLikesReview = (index) => {
        if(sessionStorage.getItem("sessionId") === null){
            navigate("/login");
            return;
        }
        if(likedReviews.includes(reviewsToRender[index]._id)){
            let tempIndex = likedReviews.indexOf(reviewsToRender[index]._id);
            likedReviews.splice(tempIndex, 1);
            reviewsToRender[index].likes -= 1;
        }
        else{
            if(dislikedReviews.includes(reviewsToRender[index]._id)){
                let tempIndex = dislikedReviews.indexOf(reviewsToRender[index]._id);
                dislikedReviews.splice(tempIndex, 1)
                reviewsToRender[index].dislikes -= 1;
            }
            likedReviews.push(reviewsToRender[index]._id)
            reviewsToRender[index].likes += 1;
        }
        fetch("http://localhost:5000/api/reviews/likeReview", {
            method: "PATCH",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "sessionId": sessionStorage.getItem("sessionId"),
                "reviewId": reviewsToRender[index]._id
            })
        }).then(r => {
            return r.json()
        }).then(r => {
            if(r.message !== undefined){
                alert(r.message);
            }
        })
        setLikedOrDislikedAReview(!likedOrDislikedAReview);
    }
    const userDislikesReview = (index) => {
        if(sessionStorage.getItem("sessionId") === null){
            navigate("/login");
            return;
        }
        if(dislikedReviews.includes(reviewsToRender[index]._id)){
            let tempIndex = dislikedReviews.indexOf(reviewsToRender[index]._id);
            dislikedReviews.splice(tempIndex, 1);
            reviewsToRender[index].dislikes -= 1;
        }
        else{
            if(likedReviews.includes(reviewsToRender[index]._id)){
                let tempIndex = likedReviews.indexOf(reviewsToRender[index]._id);
                likedReviews.splice(tempIndex, 1)
                reviewsToRender[index].likes -= 1;
            }
            dislikedReviews.push(reviewsToRender[index]._id)
            reviewsToRender[index].dislikes += 1;
        }
        fetch("http://localhost:5000/api/reviews/dislikeReview", {
            method: "PATCH",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "sessionId": sessionStorage.getItem("sessionId"),
                "reviewId": reviewsToRender[index]._id
            })
        }).then(r => {
            return r.json()
        }).then(r => {
            if(r.message !== undefined){
                alert(r.message);
            }
        })
        setLikedOrDislikedAReview(!likedOrDislikedAReview);
    }

    useEffect(()=>{}, [likedOrDislikedAReview])

    return(
        <>
                    <label className="text-styling like-pop-up-window" ref={likeButtonWindowPopUpRef} style={{opacity: `${likeButtonPopUpWindow[0] ? "1" : "0"}`, top: `${likeTopAndLeft[0] !== undefined ? likeTopAndLeft[0] : "0"}`, left: `${likeTopAndLeft[1] !== undefined ? likeTopAndLeft[1] : "0"}`,transitionDelay: `${ likeButtonPopUpWindow[0] ? "0.5s" : "0s"}`}}>Like</label>
                    <label className="text-styling dislike-pop-up-window" ref={dislikeButtonWindowPopUpRef} style={{opacity: `${dislikeButtonPopUpWindow[0] ? "1" : "0"}`, top: `${dislikeTopAndLeft[0] !== undefined ? dislikeTopAndLeft[0] : "0"}`, left: `${dislikeTopAndLeft[1] !== undefined ? dislikeTopAndLeft[1] : "0"}`,transitionDelay: `${ dislikeButtonPopUpWindow[0] ? "0.5s" : "0s"}`}}>Dislike</label>
          {  
                reviewsToRender.map((item, index) => {
                    return(
                        
                        <div key={index} ref={e => reviewsRef.current[index] = e} className='flex show-review-container' style={{height: `${reviews[index] != null ? reviews[index] : "auto"}`, maxHeight: "300px"}}>
                            <div ref={e => howBigIsTheReviewersProfile.current[index] = e} className='flex review-writer'>
                                <img src={item.image !== null ? item.image : pic} alt="" className='review-writer-image'/>
                                <label className='text-styling review-writer-username'>{item.owner}</label>
                                <label className='text-styling review-writer-rating'>{"Rating: " + item.rating + "/10"}</label>
                                <label className="text-styling" style={{marginLeft: "20px"}}>{new Date(item.reviewDate).toLocaleDateString()}</label>
                                <div className='like-review-button' ref={e => likeButtonRef.current[index] = e} onMouseOver={() => {setLikeButtonPopUpWindow([true, index])}} onMouseOut={() => {setLikeButtonPopUpWindow([false, index])}} onClick={() => userLikesReview(index)} style={{backgroundColor: likedReviews.includes(item._id) ? "lightgreen" : "green"}}></div>
                                <label className="text-styling">{item.likes}</label>
                                <div className='flex dislike-review-button-container' ref={e => dislikeButtonRef.current[index] = e} onMouseOver={() => {setDislikeButtonPopUpWindow([true, index])}} onMouseOut={() => {setDislikeButtonPopUpWindow([false, index])}}><div style={{width: "15px", height: "15px", backgroundColor: dislikedReviews.includes(item._id) ? "red" : "brown"}} onClick={() => userDislikesReview(index)}></div><label className="text-styling">{item.dislikes}</label></div>
                            </div>
                            <p className='text-styling review-text' ref={e => howLongIsTheReviewRef.current[index] = e}>{item.reviewContent}</p>
                            <div className='flex more-or-less-btn-container'><button ref={e => changeReviewBoxButtonState.current[index] = e} onClick={() => changeReviewBoxSize(index)} className='text-styling more-or-less-btn'>Read more</button></div>
                        </div>
                        
                        
                )
            })
            
        }   
        </>
    )
}

export default Review