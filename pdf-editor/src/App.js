import { Component } from 'react';
import {Stage, Layer} from 'react-konva';
import './App.css';
import { Boxes } from './components/Boxes';
import { Arrows } from './components/Arrows';
import { Texts } from './components/Texts';

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
    <div className="App" style={{position: 'absolute', overflow: 'hidden', top :55, left: 10, zIndex: 2}}>

    <button style={{position: 'relative', top: 30, zIndex: 2}} onClick={() => this.addBox()}>Add box</button>
    <button style={{position: 'relative', top: 50, zIndex: 2}} onClick={() => this.addArrow()}>Add arrow</button>
    <button style={{position: 'relative', top: 70, zIndex: 2}} onClick={() => this.addText()}>Add text</button>

      <Stage id="id-stage" width={1224} height={771}>
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
