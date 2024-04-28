import '../Styles/multiUse.css';
import '../Styles/WriteReviewStyles.css';
import { useState, useRef, useEffect} from 'react';
import { Navigate, useParams } from 'react-router-dom';

const WriteReview = () => {

    const chooseShowButtonRef = useRef();
    const [chosenShow, setChosenShow] = useState("");
    const [choosingShow, setChoosingShow] = useState(false);
    const ratingInputRef = useRef();
    const chooseShowSearchRef = useRef();
    const reviewRef = useRef();
    const submitBtn = useRef();
    const textareaPlaceholder = "Write your review here!\n*If nothing is written here you will rate the show you have chosen without leaving a review!*"
    const [probableShows, setProbableShows] = useState([]);

    const { show } = useParams();
    useEffect(() => {
        if(show !== undefined){
            setChosenShow(show)
        }
    }, [])


    if(sessionStorage.getItem("sessionId") === null){
        return(<Navigate to="/login"/>)
    }


    const displayProbableShows = () => {
        if(chooseShowSearchRef.current.value !== ""){
            console.log(chooseShowSearchRef.current.value)
            fetch("http://localhost:5000/api/shows/search", {
                method: "POST",
                headers: {"Content-type" : "application/json"},
                body: JSON.stringify({
                    "title": chooseShowSearchRef.current.value
                })
            }).then(r => {
                if(r !== null){
                    console.log(r)
                    return r.json()
                }
                return null
            }).then(r => {
                if(r !== null){
                    console.log(r);
                    setProbableShows([]);
                    r.forEach(element => {
                        setProbableShows(c => [...c, element])  
                    });
                }
            })
        }
        else{
            setProbableShows([]);
        }
    }

    const submitReview = () => {
        if(ratingInputRef.current.value === ""){
            alert("You need to give a rating!");
            return
        }
        var rating;
        try{
            rating = parseFloat(ratingInputRef.current.value);
        }
        catch (err){
            alert(err.message)
        }
        if(rating > 10){
            alert("Rating cannot be higher than 10")
            return
        }
        else if(rating < 1){
            alert("Rating cannot be lower than 1")
            return
        }
        rating = Math.round(rating * 100) / 100;
        if(reviewRef.current.value.length > 5000){
            alert("Review is too big. 5000 characters is the limit");
            return
        }
        if(chosenShow === ""){
            alert("Choose a show first!");
            return
        }

        fetch("http://localhost:5000/api/reviews", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "sessionId": sessionStorage.getItem("sessionId"),
                "show": chosenShow,
                "rating": rating,
                "reviewContent": reviewRef.current.value
            })
        }).then(r => {
            return r.json();
        }).then(r => {
            if(r.status === 200){
                alert("Successfully submited the review!");
            }
            else{
                alert(r.message);
            }
        })
    }

    return(
        <>
        <div className='flex write-review-viewport'>
            <div className='flex choose-show-give-rating-container'>
                <div className='flex choose-show-container'>
                    <label className='text-styling heading-text-styling'>Show:</label>
                    <button ref={chooseShowButtonRef} className='flex choose-show-button text-styling' onClick={() => { setChoosingShow(!choosingShow) } }>{chosenShow}</button>
                    <div className='flex choosing-show-container' style={{opacity: choosingShow ? "1" : "0", transform: "translateY(" + (choosingShow ? "27px)" : "-5px)"), pointerEvents: choosingShow ? "auto" : "none", flexDirection: "column"}}>
                        <input type="text" name="" id="" ref={chooseShowSearchRef} className='text-styling write-review-search-show-input' placeholder='Search shows' onChange={displayProbableShows}/>
                    {
                        probableShows.map((item, index) => {
                            return(
                                <div key={index} className='flex write-review-probable-shows' onClick={() => {setChosenShow(item.title); setChoosingShow(!choosingShow)}}>
                                    <img src={item.image} alt="" className='probable-show-image'/>
                                    <label className='text-styling heading-text-styling' style={{fontSize: "0.9rem", whiteSpace: "break-spaces"}}>{item.title}</label>
                                </div>
                            )
                        })
                    }
                    </div>
                </div>
                <div className='flex give-rating-container'>
                    <label htmlFor='rating' className='text-styling heading-text-styling'>Rating: </label>
                    <input type="text" name="rating" id="rating" ref={ratingInputRef} className='text-styling review-rating-input'/>
                    <label htmlFor='rating' className='text-styling'>/10</label>
                </div>
            </div>

            <textarea name="review" id="review" ref={reviewRef} className='text-styling write-review-area' placeholder={textareaPlaceholder} onInput={() => {reviewRef.current.style.height = "300px"; reviewRef.current.style.height = reviewRef.current.scrollHeight + "px"}}></textarea>
            <div className='flex' style={{justifyContent: "center"}}><button className='text-styling heading-text-styling submit-btn' ref={submitBtn} onClick={submitReview}>Submit</button></div>
        </div>
        </>
    )
}

export default WriteReview