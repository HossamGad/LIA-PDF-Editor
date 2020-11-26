//import { renderTextLayer } from "pdfjs-dist";
import React, { Component } from "react";

let array = [

];

class LocalStorage extends Component {
  state= {
    rectangel: null
  }

  componentDidMount() {
    
    for (var i = 0; i < localStorage.length; i++){
      array.push(localStorage.getItem(localStorage.key(i)));
    }

    this.setState({
      rectangel: array,
      page: document.getElementById('page-num').innerText
    })
    
  }

  /*
  componentDidUpdate() {

    for (var i = 0; i < localStorage.length; i++){
      let item = localStorage.getItem(localStorage.key(i));
      let parsedItem = JSON.parse(item);
      console.log(typeof(Number(parsedItem[i].page)));
      console.log(typeof(this.props.pgData));

      if (this.props.pgData === Number(parsedItem[i].page)) {
        console.log(parsedItem[i]);
      }
    }
  }*/
  
  /*
  const [notes, setNotes] = useState([]);
  const [noteEditing, setNoteEditing] = useState("");

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
  const json = JSON.stringify(notes);
  localStorage.setItem("notes", json);
}, [notes]);
*/
  render() {
    return (
      <div className="local-storage">
        {/*<h1>{this.state.rectangel}</h1>*/}
        <h1>{this.props.pgData}</h1>
      </div>
    );
  } 
};

export default LocalStorage;