import '../Styles/LoginRegisterBackgroundStyles.css';
import { useEffect, useState } from 'react';

const LoginRegisterBackground = () => {

    const [images, setImages] = useState();
    useEffect(() => {
        fetch("http://localhost:5000/api/shows/randomizedImages").then(r => {
            return r.json();
        }).then(r => {
            if(r.status === 200){
                console.log(r.shows)
                setImages(r.shows);
            }
        })
    }, [])

    return(
        
        <div className='background-images-container'>
        {
            //randomly place images around the screen
            images != undefined && images.map((img, index) => {
                return(
                    <img key={index} src={img} alt="" className='background-image' style={{top: Math.floor(Math.random() * 90) + "%", left: Math.floor(Math.random() * 90) +"%"}}/>
                )
            })
        }
        </div>
        
    )
}

export default LoginRegisterBackground