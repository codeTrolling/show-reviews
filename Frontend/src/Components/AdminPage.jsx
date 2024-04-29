import "../Styles/multiUse.css";
import "../Styles/AdminPageStyles.css";
import { useEffect, useRef, useState } from "react";
import AdminPageAddShow from "./AdminPageAddShow";
import AdminPageDeleteShow from "./AdminPageDeleteShow";
import { useNavigate } from "react-router-dom";
import loadingPic from "../Assets/instagramLogo.png";

const AdminPage = () => {

    const [modifyShowOption, setModifyShowOption] = useState();
    const containerRef = useRef();
    const formInputLabels = ["show-id", ""]
    const [loadingAnim, setLoadingAnim] = useState("loading-image");

    //check if user is admin
    const navigate = useNavigate();
    useEffect(() => {
        fetch("http://localhost:5000/api/users/checkAdmin", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "sessionId": sessionStorage.getItem("sessionId")
            })
        }).then(r => {
            return r.json();
        }).then(r => {
            if(r.redirect){
                navigate("/");
            }
        })
    }, [])

    // update statistics for the shows. This is done in order to avoid updating the shows after every review is written.
    // In this example with little data it would not be a problem but if this was a real app with a huge database with many users updating the statistics would be too heavy on the server.
    const updateShows = () => {
        setLoadingAnim("loading-image");
        fetch("http://localhost:5000/api/shows/updateAll", {
            method: "PATCH",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                "sessionId": sessionStorage.getItem("sessionId")
            })
        }).then(r => {
            return r.json();
        }).then(r => {
            setLoadingAnim("");
            alert(r.message);
        })
    }

    return(
        <>
        <div className="flex admin-page-buttons-container">
            <button className="text-styling heading-text-styling modify-show-options-button" onClick={() => setModifyShowOption("Add")} style={{backgroundColor: modifyShowOption === "Add" && "rgb(0, 138, 73)"}}>Add show</button>
            <button className="text-styling heading-text-styling modify-show-options-button" onClick={() => setModifyShowOption("Delete")} style={{backgroundColor: modifyShowOption === "Delete" && "rgb(0, 138, 73)"}}>Delete show</button>
            <button className="text-styling heading-text-styling modify-show-options-button" onClick={() => {setModifyShowOption("Update"); updateShows()}}>Update shows</button>
        </div>
        <div className="flex modify-shows-container" ref={containerRef}>
            {modifyShowOption === "Add" && <AdminPageAddShow/>}
            {modifyShowOption === "Delete" && <div><AdminPageDeleteShow/></div>}
            {modifyShowOption === "Update" && <img src={loadingAnim !== "" && loadingPic} className={loadingAnim}/>}
        </div>
        </>
    )
}

export default AdminPage