import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState = (props) => {
    const initial=[
        {
          "_id": "61aaf40d11f1992f54cf8be3",
          "user": "61aa1ac241d45baf4ab61a15",
          "title": "My title",
          "description": "Wake up early",
          "tag": "my tag",
          "date": "2021-12-04T04:52:29.180Z",
          "__v": 0
        },
        {
          "_id": "61aaf41011f1992f54cf8be5",
          "user": "61aa1ac241d45baf4ab61a15",
          "title": "My title",
          "description": "Wake up early",
          "tag": "my tag",
          "date": "2021-12-04T04:52:32.681Z",
          "__v": 0
        }
      ]
      const [notes,setNotes]=useState(initial)
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
           {props.children}
        </NoteContext.Provider>

    )
}
export default NoteState;