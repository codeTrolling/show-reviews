import { Link } from "react-router-dom";
import "../Styles/multiUse.css";

const NotFound = () => {

    return(
        <>
        <h1 className="heading-text-styling" style={{color: "white"}}>Page not found.</h1>
        <Link to="/" style={{fontSize: "2rem"}}>Go back to home</Link>
        </>
    )
}

export default NotFound