import React, { Component } from "react";
import { Stage, Layer } from "react-konva";
import "./App.css";
import { PDFViewer } from "./components/PDFViewer";
import { PDFDownload } from "./components/PDFDownload";
import { Rectangle } from "./components/Rectangle";
import { TextEdit } from "./components/TextEdit";
import { Arrows } from "./components/Arrows";

let idnumRect = 0;
let idnumText = 0;
let idnumArrow = 0;

const initialRectangles = [];

const initialArrows = [];

const initialTexts = [];

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      rectangles: initialRectangles, 
      selectedIdRect: null,

      texts: initialTexts,
      selectedIdText: null,

      arrows: initialArrows,
      selectedIdArrow: null,

      pageDataFromChild: 0,
      textDataFromChild: null,

      wd: 0,
      ht: 0,
    };
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
    idnumRect++;
    let rectangles = this.state.rectangles;
    rectangles.push({
      id: "rect" + idnumRect,
      page: this.state.pageDataFromChild,
      x: 110,
      y: 210,
      width: 200,
      height: 30
    });
    this.setState({
      rectangles: rectangles,
    });
  }

  addArrow() {
    idnumArrow++;
    let arrows2 = this.state.arrows;
    arrows2.push({
      id: "2arrow" + idnumArrow,
      page: this.state.pageDataFromChild,
      x: 110,
      y: 210,
      points: [0, 0, 100, 100]
    });
    this.setState({
      arrows: arrows2,
    });
  }

  addText() {
    idnumText++;

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
      id: "text" + idnumText,
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

  callbackText = (id, textData) => {
    let textId = id;
    let data = textData;
    let newText = this.state.texts;

    for(let l = 0; l < newText.length; l++) {
      if(newText[l].id === textId) {
        newText[l].text = data;

        this.setState({
          texts: newText,
        });

      }
    }
  };

  callbackArrows = (id, x1, y1, x2, y2) => {

    let arrowId = id;
    let arrowX1 = x1;
    let arrowY1 = y1;
    let arrowX2 = x2;
    let arrowY2 = y2;
    let newArrow = this.state.arrows;
    
    for(let a = 0; a < newArrow.length; a++) {
      if(newArrow[a].id === arrowId) {
        newArrow[a].x = arrowX1;
        newArrow[a].y = arrowY1;
        newArrow[a].points[2] = arrowX2;
        newArrow[a].points[3] = arrowY2;

        this.setState({
          arrows: newArrow,
        });

      }
    }
  };

  callbackRectangleDelete = (id) => {
    let rectId = id;
    let deleteRectangle = this.state.rectangles;
    
    for(let r = 0; r < deleteRectangle.length; r++) {
      if(deleteRectangle[r].id === rectId) {

        deleteRectangle.splice(r, 1);
        
        this.setState({
          rectangles: deleteRectangle,
        });

      }
    }
  }

  callbackTextDelete = (id) => {
    let textId = id;
    let deleteText = this.state.texts;
    
    for(let t = 0; t < deleteText.length; t++) {
      if(deleteText[t].id === textId) {

        deleteText.splice(t, 1);
        
        this.setState({
          texts: deleteText,
        });

      }
    }
  }

  callbackArrowDelete = (id) => {
    let arrowId = id;
    let deleteArrow = this.state.arrows;
    
    for(let a = 0; a < deleteArrow.length; a++) {
      if(deleteArrow[a].id === arrowId) {

        deleteArrow.splice(a, 1);
        
        this.setState({
          arrows: deleteArrow,
        });

      }
    }
  }

  checkDeselect(e) {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      this.setState({
        selectedIdRect: null,
        selectedIdText: null,
        selectedIdArrow: null,
      });
    }
  }

  render() {
    return (
      <>
        <canvas id="pdf-render"></canvas>
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
            <PDFDownload 
              rectProps={this.state.rectangles} 
              textProps={this.state.texts} 
              arrowProps={this.state.arrows}
            />
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
              onClick={() => this.addArrow()}
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
                      isSelected={rect.id === this.state.selectedIdRect}
                      onSelect={() => {
                        this.setState({
                          selectedIdRect: rect.id,
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
                      }}
                      cRectangleDelete={this.callbackRectangleDelete}
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
                      isSelected={text.id === this.state.selectedIdText}
                      onSelect={() => {
                        this.setState({
                          selectedIdText: text.id,
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
                      }}
                      cText={this.callbackText}
                      cTextDelete={this.callbackTextDelete}
                    />
                  );
                })}

              {this.state.arrows
              .filter((a) => a.page === this.state.pageDataFromChild)
              .map((arrow) => {
                return (
                  <Arrows
                    key={arrow.id}
                    shapeProps={arrow}
                    isSelected={arrow.id === this.state.selectedIdArrow}
                    onSelect={() => {
                      this.setState({
                        selectedIdArrow: arrow.id,
                      });
                    }}
                    onChange={(newAttrs) => {
                      const arrows = this.state.arrows.slice();
                      const index = arrows.findIndex(
                        (ca) => ca.id === arrow.id
                      );
                      arrows[index] = newAttrs;
                      this.setState({
                        arrows: arrows,
                      });
                    }}
                    cArrows={this.callbackArrows}
                    cArrowDelete={this.callbackArrowDelete}
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
