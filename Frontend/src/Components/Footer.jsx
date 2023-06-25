import '../Styles/multiUse.css';
import instagramLogo from '../Assets/instagramLogo.png';

const Footer = () => {
    return(
        <>
        <div className='flex footer'>
            <label className='text-styling' style={{marginLeft: "33%"}}>Follow us!</label>
            <img src={instagramLogo} alt="" className='footer-images'/>
        </div>
        </>
    )
}

export default Footer