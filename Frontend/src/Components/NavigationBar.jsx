import '../Styles/multiUse.css';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

const NavigationBar = () => {

    const [dropDownMenu, setDropDownMenu] = useState(false)
    const showDropDownMenu = () => {
        setDropDownMenu(true);
    }

    return(
    <>
    <div className='flex nav-container'>
        {/* <label className='nav-options'>Home</label> */}
        <Link to={"/"} className='nav-options'>Home</Link>
        <div>
            {/* <label className='nav-options' onMouseOver={showDropDownMenu} onMouseOut={() => { setDropDownMenu(false); }}>Shows</label> */}
            <Link to={"/AllShows/TopRated"} className='nav-options' onMouseOver={showDropDownMenu} onMouseOut={() => { setDropDownMenu(false); }}>Shows</Link>
            <div className='nav-drop-down-container' style={{position: 'absolute', opacity: `${dropDownMenu ? '1' : '0'}`, transform: 'translateY(' + `${dropDownMenu ? '0px)' : '-20px)'}`, pointerEvents: `${dropDownMenu ? 'all' : 'none'}`}} onMouseOver={showDropDownMenu} onMouseOut={() => { setDropDownMenu(false); }}>
                {/* <label className='text-styling nav-drop-down'>Top rated</label> */}
                <Link to="/AllShows/TopRated" className='text-styling nav-drop-down'>Top rated</Link>
                <Link to="/AllShows/Popular" className='text-styling nav-drop-down'>Popular</Link>
                <Link to="/AllShows/New" className='text-styling nav-drop-down'>New</Link>
                <Link to="/AllShows/LowestRated" className='text-styling nav-drop-down'>Lowest rated</Link>
            </div>
        </div>
        <Link to="/MyReviews" className='nav-options'>My reviews</Link>
        <Link to="/WriteReview" className='nav-options'>Write review</Link>
        <Link to="/RatedShows" className='nav-options'>Rated shows</Link>
        <input type="text" name="search-show" id="search-show" placeholder='Search shows' className='nav-options search-input'/>
    </div>
    </>)
}

export default NavigationBar