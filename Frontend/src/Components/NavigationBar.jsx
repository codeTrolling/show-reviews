import '../Styles/multiUse.css';
import { useState, useRef, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import pic from "../Assets/DefaultProfilePicture.png";

const NavigationBar = () => {

    const [dropDownMenu, setDropDownMenu] = useState(false)
    const showDropDownMenu = () => {
        setDropDownMenu(true);
    }
    const searchShowRef = useRef();
    const [probableShows, setProbableShows] = useState([]);
    const userProfilePictureRef = useRef();
    const [profileMenu, setProfileMenu] = useState(false);
    const [userProfilePictureFetched, setUserProfilePictureFetched] = useState(null);

    const [modalWindow, setModalWindow] = useState(false);


    //get user profile
    useEffect(() => {
        if(sessionStorage.getItem("sessionId") !== null){
            fetch("http://localhost:5000/api/users/getUser", {
                method: "POST",
                headers: {"Content-type": "application/json"},
                body: JSON.stringify({
                    "sessionId": sessionStorage.getItem("sessionId")
                })
            }).then(r => {
                return r.json();
            }).then(r => {
                if(r.status === 200){
                    if(r.picture !== null){
                        setUserProfilePictureFetched(r.picture);
                    }
                    else{
                        setUserProfilePictureFetched("");
                    }
                }
            })
        }
        else{
            setUserProfilePictureFetched(null)
        }
    })


    const displayProbableShows = () => {
        if(searchShowRef.current.value !== ""){
            fetch("http://localhost:5000/api/shows/search", {
                method: "POST",
                headers: {"Content-type" : "application/json"},
                body: JSON.stringify({
                    "title": searchShowRef.current.value
                })
            }).then(r => {
                if(r !== null){
                    return r.json()
                }
                return null
            }).then(r => {
                if(r !== null){
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



    const deleteProfile = () => {
        fetch("http://localhost:5000/api/users/deleteUser", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "sessionId": sessionStorage.getItem("sessionId")
            })
        }).then(r => {
            return r.json();
        }).then(r => {
            if(r.status === 200){
                sessionStorage.removeItem("sessionId");
                setUserProfilePictureFetched(null);
                alert("Successfully deleted your account AND reviews!")
            }
            else{
                alert("Something went wrong: ", r.message);
            }
        })
    }


    function changeUserImage(){
        var convertImageToB64 = new FileReader();
        if(userProfilePictureRef.current.files[0] !== undefined && userProfilePictureRef.current.files[0] !== null){
            convertImageToB64.readAsDataURL(userProfilePictureRef.current.files[0])
            convertImageToB64.onload = () => {
                fetch("http://localhost:5000/api/users/updateImage", {
                    method: "PATCH",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify({
                        sessionId: sessionStorage.getItem("sessionId"),
                        image: convertImageToB64.result
                    })
                }).then(r => {
                    if(r.status === 200){
                        setUserProfilePictureFetched(convertImageToB64.result);
                    }
                    else{
                        alert("Something went wrong: " + r.message);
                    }
                })
            }
        }
    }


    function removeUserImage(){
        fetch("http://localhost:5000/api/users/updateImage", {
            method: "PATCH",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                sessionId: sessionStorage.getItem("sessionId"),
                image: ""
            })
        }).then(r => {
            if(r.status === 200){
                setUserProfilePictureFetched("");
                userProfilePictureRef.current.value = null;
            }
            else{
                alert("Something went wrong: " + r.message);
            }
        })
    }


    return(
    <>
    <div className='flex modal-window' style={{opacity: modalWindow ? "1" : "0", pointerEvents: modalWindow ? "auto" : "none"}} onClick={() => setModalWindow(!modalWindow)}>
        <label className='text-styling heading-text-styling'>Are you sure you want to delete your profile?</label>
        <button className='submit-btn text-styling' style={{backgroundColor: "red"}} onClick={deleteProfile}>Delete</button>
    </div>


    <div className='flex nav-container'>
        <Link to={"/"} className='nav-options'>Home</Link>
        <div>
            <Link to={"/AllShows/Top Rated"} className='nav-options' onMouseOver={showDropDownMenu} onMouseOut={() => { setDropDownMenu(false); }}>Shows</Link>
            <div className='nav-drop-down-container' style={{position: 'absolute', opacity: `${dropDownMenu ? '1' : '0'}`, transform: 'translateY(' + `${dropDownMenu ? '0px)' : '-20px)'}`, pointerEvents: `${dropDownMenu ? 'all' : 'none'}`}} onMouseOver={showDropDownMenu} onMouseOut={() => { setDropDownMenu(false); }}>
                <Link to="/AllShows/Top rated" className='text-styling nav-drop-down'>Top rated</Link>
                <Link to="/AllShows/Most popular" className='text-styling nav-drop-down'>Popular</Link>
                <Link to="/AllShows/Newest" className='text-styling nav-drop-down'>New</Link>
                <Link to="/AllShows/Lowest rated" className='text-styling nav-drop-down'>Lowest rated</Link>
            </div>
        </div>
        <Link to="/MyReviews" className='nav-options'>My reviews</Link>
        <Link to="/WriteReview" className='nav-options'>Write review</Link>
        <div className='flex nav-search-show-container'>
            <input type="text" name="search-show" id="search-show" placeholder='Search shows' className='nav-options search-input' ref={searchShowRef} onChange={displayProbableShows}/>
            {
                probableShows.map((item, index) => {
                    return(
                        <a key={index} href={"/Show/" + item.title} className='nav-search-show-probable-shows flex' onClick={() => setProbableShows([])}>
                            <img src={item.image} alt="" className='probable-show-image'/>
                            <label className='text-styling heading-text-styling' style={{cursor: "pointer"}}>{item.title}</label>
                        </a>
                    )
                })
            }
        </div>

        <div className='flex nav-profile-options-container'>
            <img src={userProfilePictureFetched !== null ? `${userProfilePictureFetched !== "" ? userProfilePictureFetched : pic}` : pic} alt="" className='nav-profile-pic' onClick={() => setProfileMenu(!profileMenu)}/>
            <div className='flex nav-profile-options' style={{opacity: profileMenu ? "1" : "0", transform: profileMenu ? "translateY(0)" : "translateY(-10px)", pointerEvents: profileMenu ? "auto" : "none"}}>
                {
                        userProfilePictureFetched !== null ? <>
                            <label htmlFor="new-profile-pic"className='text-styling nav-profile-option'>Change profile picture</label>
                            <input type="file" name="new-profile-pic" id="new-profile-pic" accept="image/png, image/jpeg, image/jpg" ref={userProfilePictureRef} style={{display: "none"}} onChange={changeUserImage}/>
                            <label className='text-styling nav-profile-option' onClick={removeUserImage}>Remove profile picture</label>
                            <label className='text-styling nav-profile-option' onClick={() => {sessionStorage.removeItem("sessionId"); setProfileMenu(!profileMenu)}}>Sign out</label>
                            <label className='text-styling nav-profile-option' style={{color: "red"}} onClick={() => setModalWindow(!modalWindow)}>Delete account</label>
                        </> : <>
                            <Link to="/login" className='text-styling nav-profile-option' style={{textDecoration: "none"}} onClick={() => setProfileMenu(!profileMenu)}>Sign in</Link>
                            <Link to="/register" className='text-styling nav-profile-option' style={{textDecoration: "none"}} onClick={() => setProfileMenu(!profileMenu)}>Register</Link>
                        </>
                }
            </div>
        </div>
    </div>
    </>)
}

export default NavigationBar