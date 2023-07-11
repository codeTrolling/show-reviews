import '../Styles/multiUse.css';
import { useState, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';

const NavigationBar = () => {

    const [dropDownMenu, setDropDownMenu] = useState(false)
    const showDropDownMenu = () => {
        setDropDownMenu(true);
    }
    const searchShowRef = useRef();
    const [probableShows, setProbableShows] = useState([]);

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
    </div>
    </>)
}

export default NavigationBar