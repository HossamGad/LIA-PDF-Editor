import { Component } from 'react';
import {Stage, Layer} from 'react-konva';
import './App.css';
import { Boxes } from './components/Boxes';
import { Arrows } from './components/Arrows';
import { Texts } from './components/Texts';
//import { TopBar } from './components/TopBar';
//import { texts } from './components/TopBar';
//import { arrows } from './components/TopBar';
//import { boxes } from './components/TopBar';


let boxes = [

];

let arrows = [
 
];

let texts = [
 
];


class App extends Component {
  
  state = {
    boxes: boxes,
    arrows: arrows,
    texts: texts
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
      {/* <canvas class="pdf-render" id="pdf-render"></canvas> */}
      <div className="App" style={{position: 'absolute', overflow: 'hidden', top :55, left: 0, zIndex: 2}}>
        <div className="top-bar">
            <button className="btn" id="prev-page" style={{float:"left"}}>
            <i className="fas fa-arrow-circle-left"></i> Prev Page
            </button>
            <button className="btn" id="next-page" style={{float:"left"}}>
            Next Page <i className="fas fa-arrow-circle-right"></i>
            </button>
            <span className="page-info" style={{float:"left"}}>
            Page <span id="page-num"></span> of <span id="page-count"></span>
            </span>
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
