import '../Styles/multiUse.css';
import { useState, useRef, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import pic from "../Assets/instagramLogo.png";

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
    }, [])


    const displayProbableShows = () => {
        if(searchShowRef.current.value !== ""){
            console.log(searchShowRef.current.value)
            fetch("http://localhost:5000/api/shows/search", {
                method: "POST",
                headers: {"Content-type" : "application/json"},
                body: JSON.stringify({
                    "title": searchShowRef.current.value
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

    return(
    <>
    <div className='flex nav-container'>
        {/* <label className='nav-options'>Home</label> */}
        <Link to={"/"} className='nav-options'>Home</Link>
        <div>
            {/* <label className='nav-options' onMouseOver={showDropDownMenu} onMouseOut={() => { setDropDownMenu(false); }}>Shows</label> */}
            <Link to={"/AllShows/Top Rated"} className='nav-options' onMouseOver={showDropDownMenu} onMouseOut={() => { setDropDownMenu(false); }}>Shows</Link>
            <div className='nav-drop-down-container' style={{position: 'absolute', opacity: `${dropDownMenu ? '1' : '0'}`, transform: 'translateY(' + `${dropDownMenu ? '0px)' : '-20px)'}`, pointerEvents: `${dropDownMenu ? 'all' : 'none'}`}} onMouseOver={showDropDownMenu} onMouseOut={() => { setDropDownMenu(false); }}>
                {/* <label className='text-styling nav-drop-down'>Top rated</label> */}
                <Link to="/AllShows/Top rated" className='text-styling nav-drop-down'>Top rated</Link>
                <Link to="/AllShows/Most popular" className='text-styling nav-drop-down'>Popular</Link>
                <Link to="/AllShows/Newest" className='text-styling nav-drop-down'>New</Link>
                <Link to="/AllShows/Lowest rated" className='text-styling nav-drop-down'>Lowest rated</Link>
            </div>
        </div>
        <Link to="/MyReviews" className='nav-options'>My reviews</Link>
        <Link to="/WriteReview" className='nav-options'>Write review</Link>
        <Link to="/RatedShows" className='nav-options'>Rated shows</Link>
        <div className='flex nav-search-show-container'>
            <input type="text" name="search-show" id="search-show" placeholder='Search shows' className='nav-options search-input' ref={searchShowRef} onChange={displayProbableShows}/>
            {
                probableShows.map((item, index) => {
                    return(
                        <Link key={index} to={"/Show/" + item.title} className='nav-search-show-probable-shows flex' onClick={() => setProbableShows([])}>
                            <img src={item.image} alt="" className='probable-show-image'/>
                            <label className='text-styling heading-text-styling' style={{cursor: "pointer"}}>{item.title}</label>
                        </Link>
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
                        <input type="file" name="new-profile-pic" id="new-profile-pic" accept="image/png, image/jpeg, image/jpg" ref={userProfilePictureRef} style={{display: "none"}}/>
                        <label className='text-styling nav-profile-option'>Sign out</label>
                        <label className='text-styling nav-profile-option' style={{color: "red"}}>Delete account</label>
                    </> : <>
                        <Link to="/login" className='text-styling nav-profile-option' style={{textDecoration: "none"}}>Sign in</Link>
                        <Link to="/register" className='text-styling nav-profile-option' style={{textDecoration: "none"}}>Register</Link>
                    </>
                }
                {/* <label htmlFor="new-profile-pic"className='text-styling nav-profile-option'>Change profile picture</label>
                <input type="file" name="new-profile-pic" id="new-profile-pic" accept="image/png, image/jpeg, image/jpg" ref={userProfilePictureRef} style={{display: "none"}}/>
                <label className='text-styling nav-profile-option'>Sign out</label> */}
            </div>
        </div>
    </div>
    </>)
}

export default NavigationBar