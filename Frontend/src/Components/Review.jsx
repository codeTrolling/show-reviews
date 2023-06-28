import { useState, useRef, useEffect } from "react";

const Review = ( {reviewsToRender, howRightToGo} ) => {

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
                reviewsRef.current[index].children[2].remove();
                reviewsRef.current[index].style.height = howBigIsTheReviewersProfile.current[index].offsetHeight + howLongIsTheReviewRef.current[index].offsetHeight + 50 + "px";
            }
            else{
                reviewsRef.current[index].style.height = "300px"
            }
        }

        reviewsToRender.map((item, index) => {
            testNoName(index);
        })
    },[])

    useEffect(() => {
        // responsible for bringing the like pop up window to the correct like button
        const ifFuncInEffect = () => {
            if(likeButtonPopUpWindow[1] !== undefined){
                let temp = [likeButtonRef.current[likeButtonPopUpWindow[1]].getBoundingClientRect().y, likeButtonRef.current[likeButtonPopUpWindow[1]].getBoundingClientRect().x]
                // likeButtonWindowPopUpRef.current.style.top = temp[0] + window.scrollY - 35 + "px";
                // likeButtonWindowPopUpRef.current.style.left = temp[1] - 30 + "px";
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
                //dislikeButtonWindowPopUpRef.current.style.top = temp[0] + window.scrollY - 35 + "px";
                //dislikeButtonWindowPopUpRef.current.style.left = temp[1] - 30 + "px";
                setDislikeTopAndLeft([temp[0] + window.scrollY - 35 + "px", temp[1] - 30 + "px"])
            }
        }
        ifFuncInEffect();
    }, [dislikeButtonPopUpWindow])

    return(
        <>
                    <label className="text-styling like-pop-up-window" ref={likeButtonWindowPopUpRef} style={{opacity: `${likeButtonPopUpWindow[0] ? "1" : "0"}`, top: `${likeTopAndLeft[0] !== undefined ? likeTopAndLeft[0] : "0"}`, left: `${likeTopAndLeft[1] !== undefined ? likeTopAndLeft[1] : "0"}`,transitionDelay: `${ likeButtonPopUpWindow[0] ? "0.5s" : "0s"}`}}>Like</label>
                    <label className="text-styling dislike-pop-up-window" ref={dislikeButtonWindowPopUpRef} style={{opacity: `${dislikeButtonPopUpWindow[0] ? "1" : "0"}`, top: `${dislikeTopAndLeft[0] !== undefined ? dislikeTopAndLeft[0] : "0"}`, left: `${dislikeTopAndLeft[1] !== undefined ? dislikeTopAndLeft[1] : "0"}`,transitionDelay: `${ dislikeButtonPopUpWindow[0] ? "0.5s" : "0s"}`}}>Dislike</label>
          {  
                reviewsToRender.map((item, index) => {
                    return(
                        <>
                        <div key={index} ref={e => reviewsRef.current[index] = e} className='flex show-review-container' style={{height: `${reviews[index] != null ? reviews[index] : "auto"}`, maxHeight: "300px"}}>
                            <div ref={e => howBigIsTheReviewersProfile.current[index] = e} className='flex review-writer'>
                                <img src={item['writer-image']} alt="" className='review-writer-image'/>
                                <label className='text-styling review-writer-username'>{item['writer-username']}</label>
                                <label className='text-styling review-writer-rating'>{"Rating: " + item.rating + "/10"}</label>
                                <div className='like-review-button' ref={e => likeButtonRef.current[index] = e} onMouseOver={() => {setLikeButtonPopUpWindow([true, index])}} onMouseOut={() => {setLikeButtonPopUpWindow([false, index])}}></div>
                                <div className='dislike-review-button' ref={e => dislikeButtonRef.current[index] = e} onMouseOver={() => {setDislikeButtonPopUpWindow([true, index])}} onMouseOut={() => {setDislikeButtonPopUpWindow([false, index])}}></div>
                            </div>
                            <p className='text-styling review-text' ref={e => howLongIsTheReviewRef.current[index] = e}>{"I suppose I’ll start off with how it adapted the source material. Unlike the OVAs and Phantom Blood movie, there were no cuts in content, and it actually adapted parts 1 and 2 of the manga: Phantom Blood and Battle Tendency. The studio, David Production, did what I would consider a masterful job in terms of bringing out Araki Hirohiko’s style into the manga. He is an artist, and you can see his art evolve throughout the long-running JoJo’s Bizarre Adventure franchise. DP hired multiple art directors and tried to incorporate the different faces and builds in body throughout the series. Also, because there is no such thing as “canon” colors for characters, DP, in an unexpected but very innovative manner, used their poor budget to their advantage—by changing color schemes and using colorful abstract backgrounds during monologues and still-frames. I’ll give the art by itself a 10/10, even though sometimes Jonathan and Joseph, the titular JoJos in this series, suffer from Gorilla Face Syndrome, since the BD/DVDs are doing a great job of fixing it."}</p>
                            <div className='flex more-or-less-btn-container'><button ref={e => changeReviewBoxButtonState.current[index] = e} onClick={() => changeReviewBoxSize(index)} className='text-styling more-or-less-btn'>Read more</button></div>
                        </div>
                        </>
                        
                )
            })
            
        }   
        {/* {
            reviewsToRender.map((item, index) => {
                reviewsRef.current[index].offsetHeight < howBigIsTheReviewersProfile.current[index].offsetHeight + howLongIsTheReviewRef.current[index].offsetHeight + 50 ? <div className='flex more-or-less-btn-container'><button ref={e => changeReviewBoxButtonState.current[index] = e} onClick={() => changeReviewBoxSize(index)} className='text-styling more-or-less-btn'>Read more</button></div> : changeReviewBoxButtonState.current[index] = null
            })
        } */}
        </>
    )
}

export default Review