import { useState, useRef } from "react"

const AdminPageDeleteShow = () => {
    const inputRef = useRef();
    const [labelColor, setLabelColor] = useState("white");
    const [modalWindowStyles, setModalWindowStyles] = useState(["none", "0"]);


    // used when submit is clicked
    const warningSign = () => {
        if(inputRef.current === undefined || inputRef.current.value === ""){
            setLabelColor("red");
        }
        else{
            setLabelColor("white");
            setModalWindowStyles(["auto", "1"])
        }
    }
    const deleteShow = () => {
        fetch("http://localhost:5000/api/shows/" + inputRef.current.value.toString(), {
            method: "DELETE"
        }).then(r => {
            return r.json()
        }).then(r => {
            if(r.status === "200"){
                alert("Successfully delete the show!");
                console.log(r);
            }
            else{
                alert("Something went wrong! Perhaps no record with this title was found. Here is the error:" + r.message);
            }
        })
    }


    return(
        <>
        <div className="flex modal-window" style={{pointerEvents: modalWindowStyles[0], opacity: modalWindowStyles[1]}} onClick={() => setModalWindowStyles(["none", "0"])}>
            <label className="text-styling heading-text-styling">Are you sure you want to delete the show? You cannot revert this!</label>
            <button className="submit-btn text-styling" onClick={deleteShow}>Continue anyway</button>
        </div>
        <div className="flex login-form">
            <label htmlFor="delete-show-title" className="text-styling heading-text-styling" style={{color: labelColor}}>Title of show to delete:</label>
            <div className="flex" style={{flexDirection: "column", width: "100%"}}>
                <input type="text" name="delete-show-title" id="delete-show-title" className="text-styling login-form-input" ref={inputRef}/>
            </div>
            <button className="submit-btn text-styling" onClick={warningSign}>Submit</button>
        </div>
        </>
    )
}

export default AdminPageDeleteShow