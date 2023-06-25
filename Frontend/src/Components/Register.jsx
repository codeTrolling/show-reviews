import '../Styles/multiUse.css';
import '../Styles/LoginStyles.css';
import { useRef } from 'react';

const Register = () => {

    const labelsForInputs = ["Email", "Username", "Password", "Confirm password"]
    const inputRef = useRef([])

    return(
        <div className='flex login-or-register-background'>
            <div className='flex login-form'>
                {
                    labelsForInputs.map((item, index) => {
                        return(
                            <>
                            <label key={index} htmlFor={item.toLowerCase} className='text-styling heading-text-styling'>{item}:</label>
                            <input key={index+3} type={index < 1 ? "text" : "password"} name={ index < 3 ? item.toLowerCase : "confirm-password"} id={ index < 3 ? item.toLowerCase : "confirm-password"} className='text-styling login-form-input' ref={e => inputRef[index] = e}/>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Register