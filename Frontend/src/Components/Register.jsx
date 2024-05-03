import '../Styles/multiUse.css';
import '../Styles/LoginStyles.css';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const labelsForInputs = ["Email", "Username", "Password", "Confirm password"]
    const inputRef = useRef([])
    const [requiredFieldsColor, setRequiredFieldsColor] = useState("white")
    const profileImageRef = useRef();
    const [profileImage, setProfileImage] = useState();
    const submitBtn = useRef();
    const navigate = useNavigate();


    const submitRegisterRequest = () => {
        if(inputRef.current[0].value === "" || inputRef.current[1].value === "" || inputRef.current[2].value === "" || inputRef.current[3].value === ""){
            setRequiredFieldsColor("red")
        }
        else if(inputRef.current[2].value === inputRef.current[3].value){
            setRequiredFieldsColor("white");
            var convertImageToB64 = new FileReader();
            if(profileImageRef.current.files[0] !== undefined && profileImageRef.current.files[0] !== null){
                convertImageToB64.readAsDataURL(profileImageRef.current.files[0])
                convertImageToB64.onload = () => {
                    fetch("http://localhost:5000/api/users/register", {
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify({
                    "email": inputRef.current[0].value,
                    "username": inputRef.current[1].value,
                    "password": inputRef.current[2].value,
                    "image": convertImageToB64.result
                })
            }).then(r => {
                return r.json();
            }).then(r => {
                if(r.status === 200){
                    sessionStorage.setItem("sessionId", r.sessionId)
                    navigate("/")
                }
                else{
                    alert("Something went wrong: " + r.message)
                }
            })
                }
            }
            else{
                fetch("http://localhost:5000/api/users/register", {
                    method: "POST",
                    headers: {"Content-type": "application/json"},
                    body: JSON.stringify({
                        "email": inputRef.current[0].value,
                        "username": inputRef.current[1].value,
                        "password": inputRef.current[2].value,
                        "image": null
                    })
                }).then(r => {
                    return r.json();
                }).then(r => {
                    if(r.status === 200){
                        sessionStorage.setItem("sessionId", r.sessionId)
                        navigate("/")
                    }
                    else{
                        alert("Something went wrong: " + r.message)
                    }
            })
        }
        }
        else{
            alert("Passwords do not match")
        }
    }

    return(
        <div className='flex login-or-register-background'>
            <div className='flex login-form'>
                {
                    labelsForInputs.map((item, index) => {
                        return(
                            <div key={index} className='flex immesurable-disappointment'>
                            <label htmlFor={ index < 3 ? item.toLowerCase() : "confirm-password"} className='text-styling heading-text-styling' style={{color: requiredFieldsColor}}>{item}:</label>
                            <input type={index < 2 ? "text" : "password"} name={ index < 3 ? item.toLowerCase() : "confirm-password"} id={ index < 3 ? item.toLowerCase() : "confirm-password"} className='text-styling login-form-input' ref={e => inputRef.current[index] = e}/>
                            </div>
                        )
                    })
                }
                <label htmlFor="profile-image" style={{cursor: "pointer"}} className='text-styling heading-text-styling'>{"Image (optional)"}</label>
                <input type="file" name="profile-image" id="profile-image" accept='image/png, image/jpg, image/jpeg' style={{display: "none"}} ref={profileImageRef} onChange={() => setProfileImage(URL.createObjectURL(profileImageRef.current.files[0]))}/>
                <img src={profileImage} alt="" className='register-profile-picture' style={{display: profileImage === undefined ? "none" : "block"}}/>
                <button className='text-styling heading-text-styling submit-btn' ref={submitBtn} onClick={submitRegisterRequest}>Submit</button>
                <Link to="/Login" className='text-styling login-hyperlinks'>Already registered? Login.</Link>

            </div>
        </div>
    )
}

export default Register