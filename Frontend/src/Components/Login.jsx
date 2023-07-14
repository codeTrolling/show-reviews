import '../Styles/multiUse.css';
import '../Styles/LoginStyles.css';
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const labelsForInputs = ["Username or Email", "Password"]
    const inputRef = useRef([])
    const submitBtn = useRef();
    const navigate = useNavigate();


    const attemptLogin = () => {
        fetch("http://localhost:5000/api/users/login", {
            method: "PATCH",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "email": inputRef.current[0].value,
                "password": inputRef.current[1].value
            })
        }).then(r => {
            return r.json();
        }).then(r => {
            if(r.status === 200){
                sessionStorage.setItem("sessionId", r.sessionId);
                navigate("/");
            }
            else{
                alert(r.message);
            }
        })
    }
 
    return(
        <div className='flex login-or-register-background'>
            <div className='flex login-form'>
                {
                    labelsForInputs.map((item, index) => {
                        return(
                            <div key={index} className='flex immesurable-disappointment'>
                            <label htmlFor={item.toLowerCase()} className='text-styling heading-text-styling'>{item}:</label>
                            <input type={index === 0 ? "text" : "password"} name={item.toLowerCase()} id={item.toLowerCase()} className='text-styling login-form-input' ref={e => inputRef.current[index] = e}/>
                            </div>
                        )
                    })
                }
                <button className='text-styling heading-text-styling submit-btn' ref={submitBtn} onClick={attemptLogin}>Submit</button>
                <Link to="/Reset Password" className='text-styling login-hyperlinks'>Forgot password?</Link>
                <Link to="/Register" className='text-styling login-hyperlinks'>New here? Register</Link>
            </div>
        </div>
    )
}

export default Login