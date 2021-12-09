import noteContext from '../context/notes/noteContext';
import { useState } from 'react';
import React, { useContext } from 'react'
export const Addnote = (props) => {
    const context = useContext(noteContext);
    const {addnote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const change=(e)=>{
        e.preventDefault();
        addnote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added successfully","success")
    }
    const onChange=(e)=>{
        
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div>
            <div className="container my-3">
                <h1>Enter your notes</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description} minLength={5} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                    </div>
                    <button disabled={note.title.length<5||note.description.length<5} type="submit" className="btn btn-primary" onClick={change}>Submit</button>
                </form>
            </div>
        </div>
    )
}

