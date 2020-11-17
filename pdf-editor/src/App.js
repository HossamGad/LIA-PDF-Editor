import React, { Component } from 'react';
import {Stage, Layer} from 'react-konva';
import './App.css';
import { PDFViewer } from './components/PDFViewer';
import { Rectangle } from './components/Rectangle';
import { Arrows } from './components/Arrows';
import { TextEdit } from './components/TextEdit';


let idnum = 0;
let idnum2 = 0;
let idnum3 = 0;

const initialRectangles = [
  
];

const initialArrows = [
  
];

const initialTexts = [
  
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      
      rectangles: initialRectangles,
      selectedId: null,

      arrows: initialArrows,
      selectedId2: null,

      texts: initialTexts,
      selectedId3: null,

    }
    this.canvasRef = React.createRef();
    this.checkDeselect = this.checkDeselect.bind(this);
  }

  addRectangle() {

    idnum++;

    let rectangles = this.state.rectangles;
    rectangles.push({
      x: 50,
      y: 50,
      width: 200,
      height: 30,
      fill: 'yellow',
      id: 'rect' + idnum,
      opacity: 0.5
    });
    this.setState({
      rectangles: rectangles
    });
  }

  addArrow() {

    idnum2++;

    let arrows = this.state.arrows;
        arrows.push({
        x: 90,
        y: 90,
        points: [0, 0, 100, 100],
        pointerLength: 20,
        pointerWidth: 20,
        fill: 'Red',
        stroke: 'Red',
        strokeWidth: 5,
        id: 'arrow' + idnum2
    });
    this.setState({
      arrows: arrows
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

  checkDeselect(e) {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
        this.setState({
          selectedId: null,
          selectedId2: null,
          selectedId3: null
        });
    }
  };

  render() {
    return (
      <>
      <canvas ref={this.canvasRef} id="pdf-render"></canvas>
      <div className="App" style={{position: 'absolute', overflow: 'hidden', top :55, left: 0, zIndex: 2}}>
        <div className="top-bar" style={{zIndex: 3}}>
            <PDFViewer />
            <button className="btn" style={{float:"right", marginRight:40}} onClick={() => this.addRectangle()}><i className="far fa-square"></i></button>
            <button className="btn" style={{float:"right", marginRight:5}} onClick={() => this.addArrow()}><i className="fas fa-location-arrow"></i></button>
            <button className="btn" style={{float:"right", marginRight:5}} onClick={() => this.addText()}><i className="fas fas fa-font"></i></button>
            <input id="text-area" placeholder=" Write text here..."style={{float:"right", marginRight:5, margin:5, height: 35, fontSize: 20}} />
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
                />
              );
            })}

            {this.state.arrows.map((arrow, i) => {
              return (
                <Arrows
                  key={i}
                  shapeProps={arrow}
                  isSelected={arrow.id === this.state.selectedId2}
                  onSelect={() => {
                    this.setState({
                      selectedId2: arrow.id
                    })
                  }}
                  onChange={(newAttrs) => {
                    const arrows1 = this.state.arrows.slice();
                    arrows1[i] = newAttrs;
                    this.setState({
                      arrows: arrows1
                    })
                  }}
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

          </Layer>
        </Stage>

        </div>     
      </>
    );
  }
}

export default App;
