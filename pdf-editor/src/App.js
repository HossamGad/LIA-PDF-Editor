import React, { Component } from 'react';
import {Stage, Layer} from 'react-konva';
import './App.css';
import { Arrows } from './components/Arrows';
import { Texts } from './components/Texts';
import { PDFViewer } from './components/PDFViewer';
import { Rectangle } from './components/Rectangle';

let arrows = [
 
];

let texts = [
 
];

let idnum = 0;

const initialRectangles = [
  
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      arrows: arrows,
      texts: texts,
      txt: 'Drag this text',
      rectangles: initialRectangles,
      selectedId: null
    }
    this.canvasRef = React.createRef();
    this.checkDeselect = this.checkDeselect.bind(this);
  }

  addArrow() {
    let arrows = this.state.arrows;
    arrows.push({x:300, y:200});
    this.setState({
    arrows: arrows
    });
  }

  addText() {
    let texts = this.state.texts;
    texts.push({x:400, y:300});
    this.setState({
      texts: texts
    });
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

  checkDeselect(e) {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
        this.setState({
          selectedId: null
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
        </div>

        <Stage id="id-stage" width={1224} height={1200}
          onMouseDown={this.checkDeselect}
          onTouchStart={this.checkDeselect}
        >
          <Layer>
            <Arrows arrows={arrows} />
            <Texts texts={texts} />
            
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

          </Layer>
        </Stage>

        </div>     
      </>
    );
  }
}

export default App;
