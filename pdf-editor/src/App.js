import React, { Component } from "react";
import { Stage, Layer } from "react-konva";
import "./App.css";
import { PDFViewer } from "./components/PDFViewer";
import { PDFDownload } from "./components/PDFDownload";
import { Rectangle } from "./components/Rectangle";
import { TextEdit } from "./components/TextEdit";
import { Arrows } from "./components/Arrows";
//import {rectArray} from './components/Rectangle';

let idnum = 0;
let idnum3 = 0;
let idnum4 = 0;

const initialRectangles = [];

const initialArrows2 = [];

const initialTexts = [];

//let newRectArray = [];

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

      wd: 0,
      ht: 0,
    };
    this.canvasRef = React.createRef();
    this.checkDeselect = this.checkDeselect.bind(this);
    this.renderCanvasDimensions = this.renderCanvasDimensions.bind(this);
  }

  renderCanvasDimensions(width, height) {
    let w = width;
    let h = height;

    this.setState({
      wd: w,
      ht: h,
    });
  }

  addRectangle() {
    idnum++;
    let rectangles = this.state.rectangles;
    rectangles.push({
      id: "rect" + idnum,
      page: this.state.pageDataFromChild,
      x: 110,
      y: 210,
    });
    this.setState({
      rectangles: rectangles,
    });
  }

  addArrow2() {
    idnum4++;
    let arrows2 = this.state.arrows2;
    arrows2.push({
      id: "2arrow" + idnum4,
      page: this.state.pageDataFromChild,
      x: 110,
      y: 210,
    });
    this.setState({
      arrows2: arrows2,
    });
  }

  addText() {
    idnum3++;

    let textarea = document.getElementById("text-area");

    let txt3 = textarea.value;

    if (txt3 === "") {
      alert("You have to write something in the input field.");
      return;
    }

    let texts = this.state.texts;
    texts.push({
      x: 110,
      y: 210,
      text: txt3,
      fontSize: 50,
      fontFamily: "Calibri",
      id: "text" + idnum3,
      page: this.state.pageDataFromChild,
    });
    this.setState({
      texts: texts,
    });

    textarea.value = "";
  }

  callbackPage = (pageData) => {
    let data = pageData;
    this.setState({
      pageDataFromChild: data,
    });
  };

  checkDeselect(e) {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      this.setState({
        selectedId: null,
        selectedId3: null,
        selectedId4: null,
      });
    }
  }

  render() {
    return (
      <>
        <canvas ref={this.canvasRef} id="pdf-render"></canvas>
        <div
          id="test-div"
          style={{ position: "absolute", top: 200, left: 200, zIndex: 4 }}
        ></div>
        <div
          id="id-app"
          className="App"
          style={{
            position: "absolute",
            overflow: "hidden",
            top: 82,
            left: 0,
            zIndex: 2,
          }}
        >
          <div id="tbar" className="top-bar" style={{ zIndex: 3 }}>
            <PDFViewer
              cPage={this.callbackPage}
              renderDimensions={this.renderCanvasDimensions}
            />
            <PDFDownload />
            <button
              id="idrect"
              className="btn"
              style={{ float: "right", marginRight: 40 }}
              onClick={() => this.addRectangle()}
            >
              <i className="far fa-square"></i>
            </button>
            <button
              className="btn"
              style={{ float: "right", marginRight: 5 }}
              onClick={() => this.addArrow2()}
            >
              <i className="fas fa-location-arrow"></i>
            </button>
            <button
              className="btn"
              style={{ float: "right", marginRight: 5 }}
              onClick={() => this.addText()}
            >
              <i className="fas fas fa-font"></i>
            </button>
            <input
              id="text-area"
              placeholder=" Write text here..."
              style={{
                float: "right",
                marginRight: 5,
                margin: 5,
                height: 35,
                fontSize: 20,
              }}
            />
          </div>

          <Stage
            ref={this.stageElem}
            id="id-stage"
            width={this.state.wd}
            height={this.state.ht}
            onMouseDown={this.checkDeselect}
            onTouchStart={this.checkDeselect}
          >
            <Layer ref={this.layerElem}>
              {this.state.rectangles
                .filter((r) => r.page === this.state.pageDataFromChild)
                .map((rect) => {
                  return (
                    <Rectangle
                      key={rect.id}
                      shapeProps={rect}
                      isSelected={rect.id === this.state.selectedId}
                      onSelect={() => {
                        this.setState({
                          selectedId: rect.id,
                        });
                      }}
                      onChange={(newAttrs) => {
                        const rects = this.state.rectangles.slice();
                        const index = rects.findIndex(
                          (cr) => cr.id === rect.id
                        );
                        rects[index] = newAttrs;
                        this.setState({
                          rectangles: rects,
                        });
                        console.log(newAttrs);
                      }}
                      pgData={this.state.pageDataFromChild}
                    />
                  );
                })}

              {this.state.texts
                .filter((t) => t.page === this.state.pageDataFromChild)
                .map((text) => {
                  return (
                    <TextEdit
                      key={text.id}
                      shapeProps={text}
                      isSelected={text.id === this.state.selectedId3}
                      onSelect={() => {
                        this.setState({
                          selectedId3: text.id,
                        });
                      }}
                      onChange={(newAttrs) => {
                        const texts = this.state.texts.slice();
                        const index = texts.findIndex(
                          (ct) => ct.id === text.id
                        );
                        texts[index] = newAttrs;
                        this.setState({
                          texts: texts,
                        });
                        console.log(newAttrs);
                      }}
                    />
                  );
                })}

              {this.state.arrows2
              .filter((a) => a.page === this.state.pageDataFromChild)
              .map((arrow) => {
                return (
                  <Arrows
                    key={arrow.id}
                    shapeProps={arrow}
                    isSelected={arrow.id === this.state.selectedId4}
                    onSelect={() => {
                      this.setState({
                        selectedId4: arrow.id,
                      });
                    }}
                    onChange={(newAttrs) => {
                      const arrows = this.state.arrows2.slice();
                      console.log(arrows);
                      const index = arrows.findIndex(
                        (ca) => ca.id === arrow.id
                      );
                      arrows[index] = newAttrs;
                      this.setState({
                        arrows2: arrows,
                      });
                      console.log(newAttrs);
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
