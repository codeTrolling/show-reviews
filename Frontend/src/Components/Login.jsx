import '../Styles/multiUse.css';
import '../Styles/LoginStyles.css';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    const labelsForInputs = ["Username or Email", "Password"]
    const inputRef = useRef([])
    const submitBtn = useRef();

    return(
        <div className='flex login-or-register-background'>
            <div className='flex login-form'>
                {
                    labelsForInputs.map((item, index) => {
                        return(
                            <div key={index} className='flex immesurable-disappointment'>
                            <label htmlFor={item.toLowerCase()} className='text-styling heading-text-styling'>{item}:</label>
                            <input type={index === 0 ? "text" : "password"} name={item.toLowerCase()} id={item.toLowerCase()} className='text-styling login-form-input' ref={e => inputRef[index] = e}/>
                            </div>
                        )
                    })
                }
                <button className='text-styling heading-text-styling submit-btn' ref={submitBtn}>Submit</button>
                <Link to="/Reset Password" className='text-styling login-hyperlinks'>Forgot password?</Link>
                <Link to="/Register" className='text-styling login-hyperlinks'>New here? Register</Link>
            </div>
        </div>
    )
}

export default Login