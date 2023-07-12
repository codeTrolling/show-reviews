import '../Styles/multiUse.css';
import '../Styles/LoginStyles.css';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

    const labelsForInputs = ["Email", "Username", "Password", "Confirm password"]
    const inputRef = useRef([])
    const profileImageRef = useRef();
    const [profileImage, setProfileImage] = useState();
    const submitBtn = useRef();

    return(
        <div className='flex login-or-register-background'>
            <div className='flex login-form'>
                {
                    labelsForInputs.map((item, index) => {
                        return(
                            <div key={index} className='flex immesurable-disappointment'>
                            <label htmlFor={ index < 3 ? item.toLowerCase() : "confirm-password"} className='text-styling heading-text-styling'>{item}:</label>
                            <input type={index < 1 ? "text" : "password"} name={ index < 3 ? item.toLowerCase() : "confirm-password"} id={ index < 3 ? item.toLowerCase() : "confirm-password"} className='text-styling login-form-input' ref={e => inputRef[index] = e}/>
                            </div>
                        )
                    })
                }
                <label htmlFor="profile-image" style={{cursor: "pointer"}} className='text-styling heading-text-styling'>{"Image (optional)"}</label>
                <input type="file" name="profile-image" id="profile-image" accept='image/png, image/jpg, image/jpeg' style={{display: "none"}} ref={profileImageRef} onChange={() => setProfileImage(URL.createObjectURL(profileImageRef.current.files[0]))}/>
                {console.log(profileImage)}
                <img src={profileImage} alt="" className='register-profile-picture' style={{display: profileImage === undefined ? "none" : "block"}}/>
                <button className='text-styling heading-text-styling submit-btn' ref={submitBtn}>Submit</button>
                <Link to="/Login" className='text-styling login-hyperlinks'>Already registered? Login.</Link>

            </div>
        </div>
    )
}

export default Register