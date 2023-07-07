import { useEffect, useRef, useState } from "react"
import '../Styles/AdminPageAddShowStyles.css';

const AdminPageAddShow = () => {

    const inputLabels = ["title", "type", "genres", "duration", "pg-rating", "release-date"]
    const formRef = useRef();
    const formInputsRef = useRef([]);
    const descriptionRef = useRef();
    const [addCastButtonClicked, setAddCastButtonClicked] = useState([]);
    const [showImage, setShowImage] = useState();
    const showImageRef = useRef();
    const castMemberCharacterNameInputRef = useRef([]);
    const castMemberActorNameInputRef = useRef([]);
    const castMemberIsMainCharacterRef = useRef([]);
    const castMemberImageRef = useRef([]);
    const [castMemberImageIndex, setCastMemberImageIndex] = useState();
    const [castMemberImageStateChange, setCastMemberImageStateChange] = useState(false);
    const [castMemberImage, setCastMemberImage] = useState([]);
    const showCharacterImageIfPresentRef = useRef([]);
    const submitBtnRef = useRef();


    // useEffect(() => {
    //     const checkIfImageIsUploaded = () => {
    //         if(castMemberImageRef.current[castMemberImageIndex] !== undefined){
    //             if(castMemberImageRef.current[castMemberImageIndex].value !== ""){
    //                 let temp = castMemberImage;
    //                 temp[castMemberImageIndex] = "block"
    //                 setCastMemberImage(temp);
    //                 let reader = new FileReader();
    //                 reader.readAsDataURL(castMemberImageRef.current[castMemberImageIndex].files[0]);
    //                 reader.onload = () => {

    //                     showCharacterImageIfPresentRef.current[castMemberImageIndex].source = castMemberImageRef.current[castMemberImageIndex].file;
    //                 }
    //                 console.log(showCharacterImageIfPresentRef.current[castMemberImageIndex].source)
    //             }
    //             else{
    //                 let temp = castMemberImage;
    //                 temp[castMemberImageIndex] = "none"
    //                 setCastMemberImage(temp);
    //             }
    //             console.log(castMemberImageRef.current[castMemberImageIndex], castMemberImageRef.current[castMemberImageIndex].value)
    //         }
    //     }

    //     checkIfImageIsUploaded();
    // }, [castMemberImageStateChange])

    const clearRefs = () =>{
        if(castMemberCharacterNameInputRef.current[addCastButtonClicked.length - 1] !== undefined){
            castMemberCharacterNameInputRef.current.slice(0, -1);
        }
        if(castMemberActorNameInputRef.current[addCastButtonClicked.length - 1] !== undefined){
            castMemberActorNameInputRef.current.slice(0, -1);
        }
        if(castMemberIsMainCharacterRef.current[addCastButtonClicked.length - 1] !== undefined){
            castMemberIsMainCharacterRef.current.slice(0, -1);
        }
        if(castMemberImageRef.current[addCastButtonClicked.length - 2] !== undefined){
            // castMemberImageRef.current.slice(0, -1);
            castMemberImageRef.current.slice(0, -1);
        }
    }

    const onShowImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setShowImage(URL.createObjectURL(e.target.files[0]));
        }
    }

    const onCharacterImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let temp = castMemberImage;
            temp[castMemberImageIndex] = URL.createObjectURL(event.target.files[0])
            setCastMemberImage(temp);
            console.log(castMemberImage)
        }
       }

       useEffect(() => {
        if(showCharacterImageIfPresentRef.current[castMemberImageIndex] !== undefined){

            showCharacterImageIfPresentRef.current[castMemberImageIndex].source = castMemberImage[castMemberImageIndex]
        }
       }, [castMemberImageStateChange])


    return(
        <>
        <div className="login-form" ref={formRef}>
            <div className="flex" style={{alignItems: "center"}}><label htmlFor="show-image" className="text-styling heading-text-styling" ref={showImageRef}>Image:</label> 
            <input type="file" name="show-image" id="show-image" style={{display: "none"}} onChange={onShowImageChange}/>
            <img src={showImage} alt="" style={{height: "80px", maxWidth: "50px"}}/>
            </div>
            {
                inputLabels.map((item, index) => {
                    return(
                        <>
                        <label htmlFor={item} className="text-styling heading-text-styling">{item.includes("-") ? item.split("-").map((item, index) => index === 0 ? item + " ": item + ":") : item + ":"}</label>
                        <input type="text" name={item} id={item} className="text-styling login-form-input" ref={e => formInputsRef.current[index] = e}/>
                        </>
                    )
                })
            }

            <label htmlFor="description" className="text-styling heading-text-styling">Synopsis:</label>
            <textarea name="description" id="description" ref={descriptionRef} className="text-styling write-review-area" style={{width: "-webkit-fill-available"}} placeholder="Write synopsis here"></textarea>
            <div className="flex" style={{justifyContent: "space-around"}}>
                <div className="flex"><label className="text-styling heading-text-styling" style={{marginRight: "15px"}}>Add cast: </label> <button onClick={() => {setAddCastButtonClicked(c => [...c, ""])}}>Add</button> </div>
                <div className="flex"><label className="text-styling heading-text-styling" style={{marginRight: "15px"}}>Remove cast: </label> <button onClick={() => {setAddCastButtonClicked(c => c.slice(0, -1)); clearRefs()}}>Remove</button> </div>
            </div>
            {
                addCastButtonClicked.map((i, index) => {
                    return(
                        <>
                        <div key={index} className="flex cast-members-container">
                            <label htmlFor={"character-name" + index} className="text-styling heading-text-styling">Character name:</label>
                            <input type="text" name={"character-name" + index} id={"character-name" + index} ref={e => castMemberCharacterNameInputRef.current[index] = e} className="text-styling cast-member-form-input"/>
                            <label htmlFor={"actor-name" + index} className="text-styling heading-text-styling">Actor name:</label>
                            <input type="text" name={"actor-name" + index} id={"actor-name" + index} ref={e => castMemberActorNameInputRef.current[index] = e} className="text-styling cast-member-form-input"/>
                            <div className="flex" style={{alignItems: "center"}}>
                                <label htmlFor={"is-main" + index} className="text-styling heading-text-styling">Main?:</label>
                                <input type="checkbox" name="is-main" id="is-main" ref={e => castMemberIsMainCharacterRef.current[index] = e} className="checkbox-input"/>
                            </div>
                            <div className="flex" style={{alignItems: "center"}}>
                                <label htmlFor={"character-image" + index} className="text-styling heading-text-styling" onClick={() => setCastMemberImageIndex(index)}>Image: </label>
                                <input type="file" name={"character-image" + index} id={"character-image" + index} ref={e => castMemberImageRef.current[index] = e} onChange={(e) => {onCharacterImageChange(e); setCastMemberImageStateChange(!castMemberImageStateChange)}} style={{display: "none"}}/>
                                <img src={castMemberImage[index]} alt="" ref={e => showCharacterImageIfPresentRef.current[index] = e} style={{height: "50px", maxWidth: "36px"}}/>
                            </div>
                        </div>
                        </>
                    )
                })
            }
            <div className="flex" style={{justifyContent: "center"}}><button className="text-styling heading-text-styling submit-btn" ref={submitBtnRef} style={{marginTop: "5px"}}>Submit</button></div>
        </div>
        </>
    )
}

export default AdminPageAddShow

//() => setCastMemberImageStateChange(!castMemberImageStateChange)