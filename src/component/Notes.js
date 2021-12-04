import noteContext from '../context/notes/noteContext';
import React,{useContext} from 'react'
import { Noteitem } from './Noteitem';
export const Notes = () => {
    const context = useContext(noteContext);
    const {notes,setNotes}=context;
    return (
        <div className="row my-3">
            <h1>your notes here</h1>
                {notes.map((note)=>{
                    return <Noteitem note={note}/>;
                })}
        </div>
    )
}
