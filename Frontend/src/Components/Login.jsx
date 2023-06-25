import '../Styles/multiUse.css';
import '../Styles/LoginStyles.css';
import { useRef } from 'react';

const Login = () => {

    const labelsForInputs = ["Username or Email", "Password"]
    const inputRef = useRef([])

    return(
        <div className='flex login-or-register-background'>
            <div className='flex login-form'>
                {
                    labelsForInputs.map((item, index) => {
                        return(
                            <>
                            <label key={index} htmlFor={item.toLowerCase} className='text-styling heading-text-styling'>{item}:</label>
                            <input type={index === 0 ? "text" : "password"} name={item.toLowerCase} id={item.toLowerCase} className='text-styling login-form-input' ref={e => inputRef[index] = e}/>
                            </>
                        )
                    })
                }
                <label className='text-styling'>Forgot password?</label>
            </div>
        </div>
    )
}

export default Login