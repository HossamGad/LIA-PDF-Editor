import React, { Component } from 'react';
//import { Texts } from './Texts';

/*
export let texts = [
    
];

export let arrows = [
 
];

export let boxes = [

];
*/
export class TopBar extends Component {
    /*
    state = {
        boxes: boxes,
        arrows: arrows,
        texts: texts
    }

    addText() {
        let texts = this.state.texts;
        texts.push({x:400, y:300});
        this.setState({
            texts: texts
        });
    }
    
    addBox() {
        let boxes = this.state.boxes;
        boxes.push({x:180, y:180, color:"yellow"});
        this.setState({
            boxes: boxes
        });
    }
    
    addArrow() {
        let arrows = this.state.arrows;
        arrows.push({x:300, y:200});
        this.setState({
            arrows: arrows
        });
    }
    */

    /*
    render(props) {
        return(
            
            <div className="top-bar">
            
                <button className="btn" id="prev-page">
                <i className="fas fa-arrow-circle-left"></i> Prev Page
                </button>
                <button className="btn" id="next-page">
                Next Page <i className="fas fa-arrow-circle-right"></i>
                </button>
                <span className="page-info">
                Page <span id="page-num"></span> of <span id="page-count"></span>
                </span>
                <button className="btn" style={{float:"right", marginRight:40}} onClick={() => this.addBox()}> Add box</button>
                <button className="btn" style={{float:"right", marginRight:5}} onClick={() => this.addArrow()}> Add arrow</button>
                <button className="btn" style={{float:"right", marginRight:5}} onClick={() => this.props.addText()}> Add text</button>
            </div>

        )       
    }
*/
}

export default TopBar