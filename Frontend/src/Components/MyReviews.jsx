import { useEffect, useRef, useState } from "react";
import "../Styles/MyReviewsStyles.css";
import { Link, Navigate, useParams } from "react-router-dom";

const MyReviews = () => {
    const searchRef = useRef();
    const [probableShows, setProbableShows] = useState([])
    const [specificShow, setSpecificShow] = useState("");
    const [userReviews, setUserReviews] = useState([]);
    const { page = 1 } = useParams();
    const reviewRef = useRef([]);
    //used to check review size
    const reviewInformationRef = useRef([]);
    const reviewContentRef = useRef([]);
    //
    const moreOrLessButtonRef = useRef([]);
    const [removeButtonsIfNeeded, setRemoveButtonsIfNeeded] = useState(false);


    // get user reviews
    useEffect(() => {
        if(specificShow === ""){
            fetch("http://localhost:5000/api/reviews/userReviews", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    "sessionId": sessionStorage.getItem("sessionId"),
                    "page": page
                })
            }).then(r => {
                return r.json();
            }).then(r => {
                if(r.status === 200){
                    if(r.reviews !== null){
                        setUserReviews(r.reviews)
                        setRemoveButtonsIfNeeded(!removeButtonsIfNeeded);
                    }
                    else{
                        setUserReviews([]);
                        setRemoveButtonsIfNeeded(!removeButtonsIfNeeded);
                    }
                }
                else{
                    alert(r.message);
                }
            })
        }
        else{
            fetch("http://localhost:5000/api/reviews/userReviews", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    "sessionId": sessionStorage.getItem("sessionId"),
                    "title": specificShow,
                    "page": page
                })
            }).then(r => {
                return r.json();
            }).then(r => {
                if(r.status === 200){
                    if(r.reviews !== null){
                        setUserReviews(r.reviews)
                        console.log(r.reviews)
                        setRemoveButtonsIfNeeded(!removeButtonsIfNeeded);
                    }
                    else{
                        setUserReviews([]);
                        setRemoveButtonsIfNeeded(!removeButtonsIfNeeded);
                    }
                }
                else{
                    alert(r.message);
                }
            })
        }
    }, [specificShow])


    //removes read more/less buttons if they are not needed
    useEffect(() => {
        const testNoName = (index) => {
            if(reviewRef.current[index] !== undefined && reviewRef.current[index] !== null){
                if(reviewRef.current[index].children[reviewRef.current[index].children.length - 1] !== undefined && reviewRef.current[index].offsetHeight > reviewInformationRef.current[index].offsetHeight + reviewContentRef.current[index].offsetHeight + 50){
                    //reviewRef.current[index].children[reviewRef.current[index].children.length - 1].remove();
                    moreOrLessButtonRef.current[index].style.display = "none";
                    moreOrLessButtonRef.current[index].style.pointerEvents = "none";
                    reviewRef.current[index].style.height = reviewInformationRef.current[index].offsetHeight + reviewContentRef.current[index].offsetHeight + 50 + "px";
                }
                else{
                    moreOrLessButtonRef.current[index].style.display = "block";
                    moreOrLessButtonRef.current[index].style.pointerEvents = "auto";
                    reviewRef.current[index].style.height = "300px"
                }
            }
        }
        // const forLoopTemp = [0,0,0,0,0,0,0,0,0,0]
        // forLoopTemp.map((item, index) => {
        //     testNoName(index);
        userReviews.map((item, index) => {
            testNoName(index)
        })
            //console.log(reviewRef.current[index] !== undefined && reviewRef.current[index].children[reviewRef.current[index].children.length - 1])
        //})
    }, [removeButtonsIfNeeded])


    if(sessionStorage.getItem("sessionId") === null){
        return(<Navigate to={"/login"}/>)
    }

    const displayProbableShows = () => {
        if(searchRef.current.value !== ""){
            fetch("http://localhost:5000/api/shows/search", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    "title": searchRef.current.value
                })
            }).then(r => {
                return r.json();
            }).then(r => {
                if(r !== null){
                    setProbableShows([]);
                    r.forEach(item => {
                        setProbableShows(c => [...c, item]);
                    })
                }
            })
        }
        else{
            setProbableShows([]);
            setSpecificShow("");
        }
    }

    const changeReviewBoxSize = (index) => {
        if(reviewRef.current[index].offsetHeight <= 330){
            reviewRef.current[index].style.maxHeight = "";
            reviewRef.current[index].style.height = reviewInformationRef.current[index].offsetHeight + reviewContentRef.current[index].offsetHeight + 50 + "px";
            moreOrLessButtonRef.current[index].textContent = "Read less";
        }
        else{
            reviewRef.current[index].style.maxHeight = "";
            reviewRef.current[index].style.height = reviewInformationRef.current[index].offsetHeight + reviewContentRef.current[index].offsetHeight + 50 <=300 ? reviewInformationRef.current[index].offsetHeight + reviewContentRef.current[index].offsetHeight + 50 + "px" : "300px";
            moreOrLessButtonRef.current[index].textContent = "Read more";
        }
    }


    return(
        <div className="flex rated-shows-viewport">
            <div className="flex" style={{marginTop: "15px"}}>
                <label htmlFor="search-for-reviews" className="text-styling heading-text-styling" style={{alignSelf: "center"}}>Show (leaving this empty will show all reviews):</label>
                <div className="flex" style={{flexDirection: "column"}}>
                    <input type="text" name="search-for-reviews" id="search-for-reviews" className="text-styling my-reviews-search" ref={searchRef} onChange={displayProbableShows}/>
                    <div className="flex my-reviews-probable-shows-container">
                        {
                            probableShows.map((item, index) => {
                                return(
                                    <div key={index} className="flex my-reviews-probable-show" onClick={() => {searchRef.current.value = item.title; setSpecificShow(item.title); setProbableShows([])}}>
                                        <img src={item.image} alt="" className='probable-show-image'/>
                                        <label className='text-styling heading-text-styling' style={{cursor: "pointer"}}>{item.title}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>

            {
                userReviews[0] !== null ? userReviews.map((item, index) => {
                    console.log(userReviews)
                    return(
                        <div className="flex my-reviews-review-container" key={index} ref={e => reviewRef.current[index] = e} style={{height: "300px"}}>
                            <div className="flex my-reviews-review-information" ref={e => reviewInformationRef.current[index] = e}>
                                <label className="text-styling">{"Show: " + item.show.toString()}</label>
                                <label className="text-styling">{"Rating: " + item.rating.toString() + "/10"}</label>
                                <label className="text-styling">{"Likes: " + item.likes.toString()}</label>
                                <label className="text-styling">{"Dislikes: " + item.dislikes.toString()}</label>
                                <label className="text-styling">{"Date: " + new Date(item.reviewDate).toLocaleDateString()}</label>
                                <div style={{width: "50px", height: "50px", backgroundColor: "red"}}></div>
                            </div>
                            <p className="text-styling review-text" ref={e => reviewContentRef.current[index] = e}>{item.reviewContent !== undefined && item.reviewContent}</p>
                            <div className='flex more-or-less-btn-container' style={{borderRadius: "0 0 10px 10px"}}><button onClick={() => changeReviewBoxSize(index)} className='text-styling more-or-less-btn' ref={e => moreOrLessButtonRef.current[index] = e}>Read more</button></div>
                        </div>
                    )
                }) : <p className="no-reviews-found">
                    No reviews found!
                </p>
            }

            <div className="flex" style={{margin: "0 auto"}}>
                {
                    parseInt(page) - 1 >= 1 && <Link to={"/MyReviews/" + (parseInt(page) - 1).toString()} className="text-styling" style={{marginRight: "50px"}}>Previous page</Link>
                }
                {
                    userReviews.length >= 10 && <Link to={"/MyReviews/" + (parseInt(page) + 1).toString()} className="text-styling">Next page</Link>
                }
                {/* <Link to={"/MyReviews/" + (parseInt(page) - 1 >= 1 ? (parseInt(page) - 1).toString() : "1")} className="text-styling">Previous page</Link>
                <Link to={"/MyReviews/" + (userReviews.length >= 10 ? (parseInt(page) + 1).toString() : page)} className="text-styling">Next page</Link> */}
            </div>
        </div>
    )
}

export default MyReviews