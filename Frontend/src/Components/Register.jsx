import '../Styles/multiUse.css';
import '../Styles/LoginStyles.css';
import { useRef } from 'react';

const Register = () => {

    const labelsForInputs = ["Email", "Username", "Password", "Confirm password"]
    const inputRef = useRef([])
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
                <button className='text-styling heading-text-styling submit-btn' ref={submitBtn}>Submit</button>
                <label className='text-styling login-hyperlinks'>Already registered? Login.</label>

            </div>
        </div>
    )
}

export default Register