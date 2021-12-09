import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
export const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deletenote}=context;
    const { note,updateNote} = props;
    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fas fa-trash-alt mx-2" onClick={()=>{deletenote(note._id);props.showAlert("Note deleted successfully","success")
}}></i>
                    <i className="fas fa-edit mx-2" onClick={()=>{updateNote(note);props.showAlert("Updated successfull","success")
}}></i>
                </div>
            </div> 
        </div>
    )
}
