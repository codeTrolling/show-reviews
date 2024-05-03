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

    //used to clear actor refs when removing an added actor record. basically if you try to add an actor but decide not to add them later clicking "remove" will clear the refs for that actor
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
        }
       }

       useEffect(() => {
        if(showCharacterImageIfPresentRef.current[castMemberImageIndex] !== undefined){

            showCharacterImageIfPresentRef.current[castMemberImageIndex].source = castMemberImage[castMemberImageIndex]
        }
       }, [castMemberImageStateChange])


       const addShow = async () => {
        let genres = formInputsRef.current[2].value.split(",");
        let mainCast = [];

        if(castMemberCharacterNameInputRef.current.length > 0){
            for(let i = 0; i < castMemberCharacterNameInputRef.current.length; i++){
                const convertToB64 = () => {
                    var converter = new FileReader();
                    converter.readAsDataURL(castMemberImageRef.current[i].files[0]);
                    return converter.onload = () => {
                        let temp = {
                            "image": converter.result,
                            "characterName": castMemberCharacterNameInputRef.current[i].value,
                            "mainCharacter": castMemberIsMainCharacterRef.current[i].checked,
                            "actorName": castMemberActorNameInputRef.current[i].value
                        }
                        mainCast.push(temp)
                    }
                }
                convertToB64();
            }
            }
       

        var convertImageToBase64 = new FileReader();
        convertImageToBase64.readAsDataURL(showImageRef.current.files[0]);
        convertImageToBase64.onload = () => {

        fetch("http://localhost:5000/api/shows", {
            method: "POST",
            headers: {"Content-type" : "application/json"},
            body: JSON.stringify({
                "sessionId": sessionStorage.getItem("sessionId"),
                "image": convertImageToBase64.result,
                "title": formInputsRef.current[0].value,
                "type": formInputsRef.current[1].value,
                "genres": genres,
                "duration": formInputsRef.current[3].value,
                "pgRating": formInputsRef.current[4].value,
                "releaseDate": parseInt(formInputsRef.current[5].value),
                "mainCast": mainCast,
                "description": descriptionRef.current.value
            })
        }).then(r => {
            return r.json()
        }).then(r =>{
            if(r.status === "200"){
                alert("Successfully added show!")
            }
            else{
                alert("Something went wrong: " + r.message)
            }
        })
       }//}
    }


    return(
        <>
        <div className="login-form" ref={formRef}>
            <div className="flex" style={{alignItems: "center"}}><label htmlFor="show-image" className="text-styling heading-text-styling" style={{cursor: "pointer"}}>Image:</label> 
            <input type="file" name="show-image" id="show-image" style={{display: "none"}} accept="image/png, image/jpeg, image/jpg" onChange={onShowImageChange} ref={showImageRef}/>
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
                        <div key={index} className="flex cast-members-container">
                            <label htmlFor={"character-name" + index} className="text-styling heading-text-styling">Character name:</label>
                            <input type="text" name={"character-name" + index} id={"character-name" + index} ref={e => castMemberCharacterNameInputRef.current[index] = e} className="text-styling cast-member-form-input"/>
                            <label htmlFor={"actor-name" + index} className="text-styling heading-text-styling">Actor name:</label>
                            <input type="text" name={"actor-name" + index} id={"actor-name" + index} ref={e => castMemberActorNameInputRef.current[index] = e} className="text-styling cast-member-form-input" onChange={() => castMemberIsMainCharacterRef.current[index] !== undefined ? console.log(castMemberIsMainCharacterRef.current[index].checked) : console.log("undefined rn")}/>
                            <div className="flex" style={{alignItems: "center"}}>
                                <label htmlFor={"is-main" + index} className="text-styling heading-text-styling">Main?:</label>
                                <input type="checkbox" name="is-main" id="is-main" ref={e => castMemberIsMainCharacterRef.current[index] = e} className="checkbox-input" />
                            </div>
                            <div className="flex" style={{alignItems: "center"}}>
                                <label htmlFor={"character-image" + index} className="text-styling heading-text-styling" onClick={() => setCastMemberImageIndex(index)} style={{cursor: "pointer"}}>Image: </label>
                                <input type="file" name={"character-image" + index} id={"character-image" + index} ref={e => castMemberImageRef.current[index] = e} accept="image/png, image/jpeg, image/jpg" onChange={(e) => {onCharacterImageChange(e); setCastMemberImageStateChange(!castMemberImageStateChange)}} style={{display: "none"}}/>
                                <img src={castMemberImage[index]} alt="" ref={e => showCharacterImageIfPresentRef.current[index] = e} style={{height: "50px", maxWidth: "36px"}}/>
                            </div>
                        </div>
                    )
                })
            }
            <div className="flex" style={{justifyContent: "center"}}><button className="text-styling heading-text-styling submit-btn" ref={submitBtnRef} style={{marginTop: "5px"}} onClick={addShow}>Submit</button></div>
        </div>
        </>
    )
}

export default AdminPageAddShow