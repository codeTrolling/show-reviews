import '../Styles/multiUse.css';
import { useState } from 'react';

const NavigationBar = () => {

    const [dropDownMenu, setDropDownMenu] = useState(false)
    const showDropDownMenu = () => {
        setDropDownMenu(true);
    }

    return(
    <>
    <div className='flex nav-container'>
        <label className='nav-options'>Home</label>
        <div>
            <label className='nav-options' onMouseOver={showDropDownMenu} onMouseOut={() => { setDropDownMenu(false); }}>Shows</label>
            <div className='nav-drop-down-container' style={{position: 'absolute', opacity: `${dropDownMenu ? '1' : '0'}`, transform: 'translateY(' + `${dropDownMenu ? '0px)' : '-20px)'}`, pointerEvents: `${dropDownMenu ? 'all' : 'none'}`}} onMouseOver={showDropDownMenu} onMouseOut={() => { setDropDownMenu(false); }}>
                <label className='text-styling nav-drop-down'>Top rated</label>
                <label className='text-styling nav-drop-down'>Popular</label>
                <label className='text-styling nav-drop-down'>New</label>
                <label className='text-styling nav-drop-down'>Lowest rated</label>
            </div>
        </div>
        <label className='nav-options'>My reviews</label>
        <label className='nav-options'>Liked reviews</label>
        <label className='nav-options'>Rated shows</label>
        <input type="text" name="search-show" id="search-show" placeholder='Search shows' className='nav-options search-input'/>
    </div>
    </>)
}

export default NavigationBar