import React from 'react';
import { Rect, Transformer } from 'react-konva';

export const rectArray = [];

const addRects = (p, id, x, y, w, h) => {

  if(p === undefined) {
    return;
  }

  if(Number(id.charAt(4)) > rectArray.length) {
    rectArray.push({pg: p, id: id, x: x, y: y, w: w, h: h});
  }

  for(let i = 0; i < rectArray.length; i++){ 
    
    if (rectArray[i].id === id) { 

      rectArray[i].x = x;
      rectArray[i].y = y;
      rectArray[i].w = w;
      rectArray[i].h = h;
      
    }

  }
  console.log(rectArray);
};

export const RectangleTest = ({ shapeProps, isSelected, onSelect, onChange, getParentStageElem, getParentLayerElem }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  
  const [deleted, setDeleted] = React.useState(false);
  
  const [rx1, setRx1] = React.useState(0);
  const [ry1, setRy1] = React.useState(0);

  const [w1, setW1] = React.useState(200);
  const [h1, setH1] = React.useState(30);

  React.useEffect(() => {

    setRx1(shapeRef.current.attrs.x);
    setRy1(shapeRef.current.attrs.y);
    setW1(shapeRef.current.attrs.width);
    setH1(shapeRef.current.attrs.height);

    let pageNumSpan = document.getElementById('page-num');

    let localStorageRectangle = [{
      page: pageNumSpan.innerText,
      id: shapeProps.id,
      x: rx1,
      y: ry1,
      w: w1,
      h: h1
    }];

    addRects(pageNumSpan.innerText, shapeProps.id, rx1, ry1, w1, h1);

    const json = JSON.stringify(localStorageRectangle);
    localStorage.setItem(shapeProps.id, json);

  }, [setRx1, setRy1, setW1, setH1, rx1, ry1, w1, h1, shapeProps]);

  React.useEffect(() => {

    if (isSelected) {
      
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);

      document.addEventListener("keydown", function(event) {
        if (event.key === 'Delete') {
          setDeleted(true);

          setDeleted(false);
            if(deleted === false) {
              const rectNode = shapeRef.current;
              const trNode = trRef.current

              if(trNode === null) {
                return;
              } else {

                trNode.destroy();
                rectNode.destroy();

                for(let a = 0; a < rectArray.length; a++) {
                  if(rectArray[a].id === rectNode.attrs.id)
                    rectArray.splice(a, 1);
                }

              }  
            }
        }
      });
    }
  }, [deleted, isSelected, getParentStageElem, getParentLayerElem]);

  return (
    <React.Fragment>
      <Rect
        x= {rx1}
        y= {ry1}
        width= {w1}
        height= {h1}
        fill= 'red'
        opacity = {0.5}
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            // set minimal value
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};
