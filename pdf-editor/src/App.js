import React, { Component } from 'react';
import {Stage, Layer} from 'react-konva';
import './App.css';
import { Boxes } from './components/Boxes';
import { Arrows } from './components/Arrows';
import { Texts } from './components/Texts';
import { PDFViewer } from './components/PDFViewer';

let boxes = [

];

let arrows = [
 
];

let texts = [
 
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      boxes: boxes,
      arrows: arrows,
      texts: texts
    }
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const context = canvas.getContext('2d');
  }

  addBox() {
    let boxes = this.state.boxes;
    boxes.push({x:180, y:180, color:"yellow"});
    this.setState({
    boxes: boxes
    }
    );
  }

  addArrow() {
    let arrows = this.state.arrows;
    arrows.push({x:300, y:200});
    this.setState({
    arrows: arrows
    }
    );
  }

  addText() {
    let texts = this.state.texts;
    texts.push({x:400, y:300});
    this.setState({
      Texts: Texts
    }
    );
  }

  render() {
    return (
      <>
      <canvas ref={this.canvasRef} id="pdf-render"></canvas>
      <div className="App" style={{position: 'absolute', overflow: 'hidden', top :55, left: 0, zIndex: 2}}>
        <div className="top-bar">
            <PDFViewer />
            <button className="btn" style={{float:"right", marginRight:40}} onClick={() => this.addBox()}><i className="far fa-square"></i></button>
            <button className="btn" style={{float:"right", marginRight:5}} onClick={() => this.addArrow()}><i className="fas fa-location-arrow"></i></button>
            <button className="btn" style={{float:"right", marginRight:5}} onClick={() => this.addText()}><i className="fas fas fa-font"></i></button>
        </div>

        <Stage id="id-stage" width={1224} height={1200}>
          <Layer>
            <Boxes boxes={boxes} />
            <Arrows arrows={arrows} />
            <Texts texts={texts}/> 
          </Layer>
        </Stage>
      </div>
      </>
    );
  }
}

export default App;
