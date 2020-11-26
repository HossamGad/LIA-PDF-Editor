/*
import React, { useState, useEffect } from 'react';
import { Rect } from 'react-konva';

export const TestLocalStorage = () => {

    const [notes, setNotes] = useState([{x: 300, y: 300}]);

    console.log(notes);
    
    const addNote = (e) => {
        e.preventDefault();
        const newNote = {
          id: Math.random().toString(36).substr(2, 9),
          text: e.target.note.value,
        };
        setNotes([...notes, newNote]);
        e.target.note.value = "";
      };

    useEffect(() => {
        const json = localStorage.getItem("rect1");
        const savedNotes = JSON.parse(json);
        if (savedNotes) {
          setNotes(savedNotes);
        }
      }, []);
      
        return(
            <React.Fragment>
            <Rect
                x= {notes[0].x}
                y= {notes[0].y}
                width= {100}
                height= {100}
                opacity = {0.5}
                draggable
            />
            </React.Fragment> )

}
*/
