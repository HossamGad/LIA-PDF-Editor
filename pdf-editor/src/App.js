import React, { Component } from 'react';
import {Stage, Layer} from 'react-konva';
import './App.css';
import { PDFViewer } from './components/PDFViewer';
import { Rectangle } from './components/Rectangle';
import { TextEdit } from './components/TextEdit';
import { Arrows } from './components/Arrows';
//import LocalStorage from './components/LocalStorage';
//import { TestLocalStorage } from './components/TestLocalStorage';

let idnum = 0;
let idnum3 = 0;
let idnum4 = 0;

const initialRectangles = [
  
];

const initialArrows2 = [
  
];

const initialTexts = [
  
];

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      
      rectangles: initialRectangles, //props.items
      selectedId: null,

      texts: initialTexts,
      selectedId3: null,

      arrows2: initialArrows2,
      selectedId4: null,

      pageDataFromChild: 0,
      // items: props.items

    }
    this.canvasRef = React.createRef();
    this.checkDeselect = this.checkDeselect.bind(this);
  }

  addRectangle() {

    idnum++;

    let rectangles = this.state.rectangles;
    rectangles.push({
    
      id: 'rect' + idnum,
      
    });
    this.setState({
      rectangles: rectangles
    });
  }

  addArrow2() {

    idnum4++;

    let arrows2 = this.state.arrows2;
        arrows2.push({
        
        id: '2arrow' + idnum4
    });
    this.setState({
      arrows2: arrows2
    });
  }

  addText() {

    idnum3++;

    let textarea = document.getElementById('text-area');

    let txt3 = textarea.value;

    if(txt3 === '') {
      alert('You have to write something in the input field.');
      return;
    }
    
    let texts = this.state.texts;
      texts.push({
      x: 110,
      y: 210,
      text: txt3,
      fontSize: 50,
      fontFamily: 'Calibri',
      id: 'text' + idnum3
    });
    this.setState({
      texts: texts
    });
  }

  callbackPage = (pageData) => {
    let data = pageData;
    this.setState({
      pageDataFromChild: data
    });
    //console.log(data);
  }

  checkDeselect(e) {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
        this.setState({
          selectedId: null,
          selectedId3: null,
          selectedId4: null
        });
    }
  };

  render() {

    // console.log(this.state.items);
    return (
      <>
      <canvas ref={this.canvasRef} id="pdf-render"></canvas>
      <div id="test-div" style={{position: 'absolute', top: 200, left: 200, zIndex: 4}}>

      </div>
      <div id="id-app" className="App" style={{position: 'absolute', overflow: 'hidden', top :55, left: 0, zIndex: 2}}>
        <div id="tbar" className="top-bar" style={{zIndex: 3}}>
            <PDFViewer cPage={this.callbackPage} />
            <button className="btn" id="download-pdf" onClick={this.handleClick}>Download PDF</button>
            <button id="idrect" className="btn" style={{float:"right", marginRight:40}} onClick={() => this.addRectangle()}><i className="far fa-square"></i></button>
            <button className="btn" style={{float:"right", marginRight:5}} onClick={() => this.addArrow2()}><i className="fas fa-location-arrow"></i></button>
            <button className="btn" style={{float:"right", marginRight:5}} onClick={() => this.addText()}><i className="fas fas fa-font"></i></button>
            <input id="text-area" placeholder=" Write text here..."style={{float:"right", marginRight:5, margin:5, height: 35, fontSize: 20}} />
            {/*<LocalStorage pgData={this.state.pageDataFromChild} />*/}
        </div>

        <Stage id="id-stage" width={1224} height={1200}
          onMouseDown={this.checkDeselect}
          onTouchStart={this.checkDeselect}
        >
          <Layer>
            
            {this.state.rectangles.map((rect, i) => {
              return (
                <Rectangle
                  key={i}
                  shapeProps={rect}
                  isSelected={rect.id === this.state.selectedId}
                  onSelect={() => {
                    this.setState({
                      selectedId: rect.id
                    })
                  }}
                  onChange={(newAttrs) => {
                    const rects = this.state.rectangles.slice();
                    rects[i] = newAttrs;
                    this.setState({
                      rectangles: rects
                    })
                  }}
                  pgData={this.state.pageDataFromChild}
                />
              );
            })}

            {this.state.texts.map((text, i) => {
              return (
                <TextEdit
                  key={i}
                  shapeProps={text}
                  isSelected={text.id === this.state.selectedId3}
                  onSelect={() => {
                    this.setState({
                      selectedId3: text.id
                    })
                  }}
                  onChange={(newAttrs) => {
                    const texts = this.state.texts.slice();
                    texts[i] = newAttrs;
                    this.setState({
                      texts: texts
                    })                   
                  }}
                />
              );
            })}

          {this.state.arrows2.map((arrow2, i) => {
            return(
              <Arrows 
                key={i}
                shapeProps={arrow2}
                isSelected={arrow2.id === this.state.selectedId4}
                onSelect={() => {
                  this.setState({
                    selectedId4: arrow2.id
                  })
                }}
                onChange={(newAttrs) => {
                  const arrows2 = this.state.arrows2.slice();
                  arrows2[i] = newAttrs;
                  this.setState({
                    arrows2: arrows2
                  })                   
                }}
              />
            );
          })}
          
          {/*<TestLocalStorage />*/}
          </Layer>
        </Stage>
        </div>    
      </>
    );
  }
}

export default App;
