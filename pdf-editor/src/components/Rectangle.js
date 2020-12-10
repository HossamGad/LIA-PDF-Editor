import React from 'react';
import { Rect, Transformer } from 'react-konva';

export const rectArray = [];

const importRects = (p, id, x, y, w, h) => {

  if(p === undefined) {
    return;
  }

  for(let i = 0; i < rectArray.length; i++){ 
    
    if ( rectArray[i].id === 'rect'+JSON.stringify(i+1)) { 

        rectArray.splice(i, 1);
    }
  }
  
  rectArray.push({pg: p, id: id, x: x, y: y, w: w, h: h});
  console.log(rectArray);
};

export const Rectangle = ({ shapeProps, isSelected, onSelect, onChange, getParentStageElem, getParentLayerElem }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();
  
  //const [rectangel, setRectangel] = React.useState(localStorage.getItem('rect1'));
  //const [pgData, setpgData] = React.useState(0);
  //const [pageNum, setPageNum] = React.useState(0);

  const [deleted, setDeleted] = React.useState(false);
  
  const [rx1, setRx1] = React.useState(0);
  const [ry1, setRy1] = React.useState(0);

  const [w1, setW1] = React.useState(200);
  const [h1, setH1] = React.useState(30);

  //const [rx12, setRx12] = React.useState(300);
  //const [ry12, setRy12] = React.useState(300);

  //const [w12, setW12] = React.useState(200);
  //const [h12, setH12] = React.useState(30);

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

    console.log(h1);

    importRects(pageNumSpan.innerText, shapeProps.id, rx1, ry1, w1, h1);

    const json = JSON.stringify(localStorageRectangle);
    localStorage.setItem(shapeProps.id, json);

  }, [setRx1, setRy1, setW1, setH1, rx1, ry1, w1, h1, shapeProps]);

  /*
  React.useEffect(() => {

    
    for (var i = 0; i < localStorage.length; i++){
      let item = localStorage.getItem(localStorage.key(i));
      let parsedItem = JSON.parse(item);
      
        setRx12(parsedItem[i].x);
        setRy12(parsedItem[i].y);
        setW12(parsedItem[i].w);
        setH12(parsedItem[i].h);
    }
  }, [setRx1, setRy1, setW1, setH1]);
  */
  
  React.useEffect(() => {

    if (isSelected) {
      
      // we need to attach transformer manually
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();

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
                //trRef.destroy();
                rectNode.destroy();
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
        fill= 'yellow'
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

