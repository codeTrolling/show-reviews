import "../Styles/multiUse.css";
import "../Styles/AdminPageStyles.css";
import { useRef, useState } from "react";
import AdminPageAddShow from "./AdminPageAddShow";
import AdminPageDeleteShow from "./AdminPageDeleteShow";

const AdminPage = () => {

    const [modifyShowOption, setModifyShowOption] = useState();
    const containerRef = useRef();
    const formInputLabels = ["show-id", ""]

    return(
        <>
        <div className="flex admin-page-buttons-container">
            <button className="text-styling heading-text-styling modify-show-options-button" onClick={() => setModifyShowOption("Add")} style={{backgroundColor: modifyShowOption === "Add" && "rgb(0, 138, 73)"}}>Add show</button>
            <button className="text-styling heading-text-styling modify-show-options-button" onClick={() => setModifyShowOption("Edit")} style={{backgroundColor: modifyShowOption === "Edit" && "rgb(0, 138, 73)"}}>Edit show</button>
            <button className="text-styling heading-text-styling modify-show-options-button" onClick={() => setModifyShowOption("Delete")} style={{backgroundColor: modifyShowOption === "Delete" && "rgb(0, 138, 73)"}}>Delete show</button>
        </div>
        <div className="flex modify-shows-container" ref={containerRef}>
            
            {/* {modifyShowOption === "Add" && <><div className="flex login-form">
                <label htmlFor="show-id">Show id:</label>
                <input type="text" name="show-id" id="show-id" className="login-form-input" />
                </div> 
                <button>ste</button></>} */}
            {modifyShowOption === "Add" && <AdminPageAddShow/>}
            {modifyShowOption === "Edit" && <div>Edit</div>}
            {modifyShowOption === "Delete" && <div><AdminPageDeleteShow/></div>}
            
        </div>
        </>
    )
}

export default AdminPage