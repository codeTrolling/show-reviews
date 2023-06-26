import '../Styles/multiUse.css';
import '../Styles/WriteReviewStyles.css';
import { useState, useRef} from 'react';
import jojo from '../Assets/JoJo_Part_1_Phantom_Blood.jpg';

const WriteReview = () => {

    const chooseShowButtonRef = useRef();
    const [chooseShowButton, setChooseShowButton] = useState();
    const [choosingShow, setChoosingShow] = useState(false);
    const ratingInputRef = useRef();
    const chooseShowSearchRef = useRef();
    const reviewRef = useRef();
    const submitBtn = useRef();

    const chooseShow = () => {
        
    }

    return(
        <>
        <div className='flex write-review-viewport'>
            <div className='flex choose-show-give-rating-container'>
                <div className='flex choose-show-container'>
                    <label className='text-styling heading-text-styling'>Show:</label>
                    <button ref={chooseShowButtonRef} className='flex choose-show-button' onClick={() => { setChoosingShow(!choosingShow) } }></button>
                    <div className='flex choosing-show-container' style={{opacity: choosingShow ? "1" : "0", transform: "translateY(" + (choosingShow ? "27px)" : "-5px)"), pointerEvents: choosingShow ? "auto" : "none", flexDirection: "column"}}>
                        <input type="text" name="" id="" ref={chooseShowSearchRef} className='text-styling write-review-search-show-input' placeholder='Search shows'/>
                    </div>
                    {
                        chooseShowButton !== undefined && <img src={jojo} className='write-review-show-image'/>
                    }
                </div>
                <div className='flex give-rating-container'>
                    <label htmlFor='rating' className='text-styling heading-text-styling'>Rating: </label>
                    <input type="text" name="rating" id="rating" ref={ratingInputRef} className='text-styling review-rating-input'/>
                    <label htmlFor='rating' className='text-styling'>/10</label>
                </div>
            </div>

            <textarea name="review" id="review" ref={reviewRef} className='text-styling write-review-area' placeholder='Write your review here!' onInput={() => {reviewRef.current.style.height = "300px"; reviewRef.current.style.height = reviewRef.current.scrollHeight + "px"}}></textarea>
            <div className='flex' style={{justifyContent: "center"}}><button className='text-styling heading-text-styling submit-btn' ref={submitBtn}>Submit</button></div>
        </div>
        </>
    )
}

export default WriteReview