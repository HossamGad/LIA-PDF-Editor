import { Component } from 'react';
import {Stage, Layer, Rect, Arrow, Text} from 'react-konva';
import './App.css';

class App extends Component {
  state = {
    isDragging: false,
    x: 10,
    y: 210
  }
  render() {
  return (
    <div className="App" style={{position: 'absolute', overflow: 'hidden', top :55, left: 10, zIndex: 2}}>
     <Stage id="id-stage" width={1224} height={771}>
      <Layer>
      <Rect 
          x={10}
          y={50}
          draggable
          width={150}
          height={30}
          fill="yellow"
          opacity={0.6}
        />
        <Arrow 
            x= {10}
            y= {90}
            draggable
            points= {[0, 0, 100, 100]}
            pointerLength= {20}
            pointerWidth= {20}
            fill='Red'
            stroke='Red'
            strokeWidth= {5}
            /> 
        <Text 
                text="Drag this text!"
                fontSize={30}
                fontFamily='Calibri'
                x={this.state.x}
                y={this.state.y}
                draggable
                fill={this.state.isDragging ? 'green' : 'red'}
                onDragStart = { () => {
                    this.setState({
                        isDragging: true
                    })
                }}
                onDragEnd  = { e => {
                    this.setState({
                        isDragging: false,
                        x: e.target.x(),
                        y: e.target.y()
                    })
                }}
            />    
      </Layer>
     </Stage>
    </div>
  );
}
}

export default App;
