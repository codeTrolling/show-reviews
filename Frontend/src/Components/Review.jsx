import { useState, useRef, useEffect } from "react";

const Review = ( {reviewsToRender} ) => {

    //TODO maybe rewrite the code to use states instead of refs
    const [reviews, setReviews] = useState([]);
    const changeReviewBoxButtonState= useRef([]);
    const reviewsRef = useRef([]);
    const howLongIsTheReviewRef = useRef([]);
    const howBigIsTheReviewersProfile = useRef([]);

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
        console.log("in effect here", reviewsRef)
        // for(let i=0; i<reviewsToRender.lenght; i++)
        // {
        //     console.log(reviewsRef.current[i])
        //     if(howBigIsTheReviewersProfile.current[i].offsetHeight + howLongIsTheReviewRef.current[i].offsetHeight + 50 <= 300)
        //     {
        //         reviewsRef.current[i].style.height = howBigIsTheReviewersProfile.current[i].offsetHeight + howLongIsTheReviewRef.current[i].offsetHeight + 50 + "px"
        //         console.log("in if ", reviewsRef.current[i].style.height)
        //     }
        //     else{
        //         reviewsRef.current[i].style.height = "300px";
        //     }
        //     if(reviewsRef.current[i].style.height < howBigIsTheReviewersProfile.current[i].offsetHeight + howLongIsTheReviewRef.current[i].offsetHeight + 50)
        //     {
        //         reviewsRef.current[i].children[2].remove();
        //     }
        // }

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
            console.log(reviewsRef.current[index])
            // let temp = reviewsRef.current[index].children[2] !== undefined;
            // let temp2 = reviewsRef.current[index].offsetHeight > howBigIsTheReviewersProfile.current[index].offsetHeight + howLongIsTheReviewRef.current[index].offsetHeight + 50;
            // temp === temp2 ? reviewsRef.current[index].children[2].remove() : !temp2 ? reviewsRef.current[index].style.height = "300px" : console.log("its ok")
            // {
            //     () => {
            //         if(reviewsRef.current[index].children[2] !== undefined && reviewsRef.current[index].offsetHeight > howBigIsTheReviewersProfile.current[index].offsetHeight + howLongIsTheReviewRef.current[index].offsetHeight + 50){
            //             reviewsRef.current[index].children[2].remove();
            //             reviewsRef.current[index].style.height = howBigIsTheReviewersProfile.current[index].offsetHeight + howLongIsTheReviewRef.current[index].offsetHeight + 50 + "px";
            //         }
            //         else{
            //             reviewsRef.current[index].style.height = "300px"
            //         }
            //     }
            
            // }
            testNoName(index);
            //reviewsRef.current[index].offsetHeight > howBigIsTheReviewersProfile.current[index].offsetHeight + howLongIsTheReviewRef.current[index].offsetHeight + 50 && reviewsRef.current[index].children[2] != undefined ? reviewsRef.current[index].children[2].remove() : reviewsRef.current[index].style.height = "300px"
        })
        console.log("why am i not in for loop")
    },[])

    return(
        <>
          {  
                reviewsToRender.map((item, index) => {
                    return(
                        
                        <div key={index} ref={e => reviewsRef.current[index] = e} className='flex show-review-container' style={{height: `${reviews[index] != null ? reviews[index] : "auto"}`, maxHeight: "300px"}}>
                            <div ref={e => howBigIsTheReviewersProfile.current[index] = e} className='flex review-writer'>
                                <img src={item['writer-image']} alt="" className='review-writer-image'/>
                                <label className='text-styling review-writer-username'>{item['writer-username']}</label>
                                <label className='text-styling review-writer-rating'>{"Rating: " + item.rating + "/10"}</label>
                                <div className='like-review-button'></div>
                                <div className='dislike-review-button'></div>
                            </div>
                            {console.log("above")}
                            {console.log("First above - ", reviewsRef.current[index])}
                            <p className='text-styling review-text' ref={e => howLongIsTheReviewRef.current[index] = e}>{"I suppose I’ll start off with how it adapted the source material. Unlike the OVAs and Phantom Blood movie, there were no cuts in content, and it actually adapted parts 1 and 2 of the manga: Phantom Blood and Battle Tendency. The studio, David Production, did what I would consider a masterful job in terms of bringing out Araki Hirohiko’s style into the manga. He is an artist, and you can see his art evolve throughout the long-running JoJo’s Bizarre Adventure franchise. DP hired multiple art directors and tried to incorporate the different faces and builds in body throughout the series. Also, because there is no such thing as “canon” colors for characters, DP, in an unexpected but very innovative manner, used their poor budget to their advantage—by changing color schemes and using colorful abstract backgrounds during monologues and still-frames. I’ll give the art by itself a 10/10, even though sometimes Jonathan and Joseph, the titular JoJos in this series, suffer from Gorilla Face Syndrome, since the BD/DVDs are doing a great job of fixing it."}</p>
                            { console.log("under", reviewsRef.current[index])}
                            {
                                // reviewsRef.current[index] != undefined && reviewsRef.current[index].offsetHeight < howBigIsTheReviewersProfile.current[index].offsetHeight + howLongIsTheReviewRef.current[index].offsetHeight + 50 ? <div className='flex more-or-less-btn-container'><button ref={e => changeReviewBoxButtonState.current[index] = e} onClick={() => changeReviewBoxSize(index)} className='text-styling more-or-less-btn'>Read more</button></div> : changeReviewBoxButtonState.current[index] = null
                            }
                            {
                                
                            }
                            { console.log("second under", reviewsRef.current[index])}
                            <div className='flex more-or-less-btn-container'><button ref={e => changeReviewBoxButtonState.current[index] = e} onClick={() => changeReviewBoxSize(index)} className='text-styling more-or-less-btn'>Read more</button></div>
                        </div>
                        
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