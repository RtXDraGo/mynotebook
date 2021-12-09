import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const host = "http://localhost:8000"
    const initial = []
    const [notes, setNotes] = useState(initial)
    //get all node
    const getnotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = await response.json()
        console.log(json)
        setNotes(json)
    }
    //add note
    const addnote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note=await response.json()
        setNotes(notes.concat(note)) 
    }

    //delete node
    const deletenote =async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });
        const json = response.json();
        console.log(json)
        const newnote = notes.filter((note) => { return note._id !== id })
        setNotes(newnote);
    }
    const editnote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = response.json();
        let nownote=JSON.parse(JSON.stringify(notes))
        //edit note
        for (let index = 0; index < nownote.length; index++) {
            const element = nownote[index];
            if (element._id === id) {
                nownote[index].title = title;
                nownote[index].description = description;
                nownote[index].tag = tag;
                break;

            }
        }
        setNotes(nownote);
    }
    return (
        <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState