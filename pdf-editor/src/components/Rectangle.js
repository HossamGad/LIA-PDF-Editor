import React from 'react';
import { Rect, Transformer } from 'react-konva';

export const Rectangle = ({ shapeProps, isSelected, onSelect, onChange, getParentStageElem, getParentLayerElem, cRectangleDelete }) => {
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

  }, [setRx1, setRy1, setW1, setH1, rx1, ry1, w1, h1, shapeProps]);

  React.useLayoutEffect(() => {

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

                cRectangleDelete(rectNode.attrs.id);

                trNode.destroy();
                rectNode.destroy();

              }  
            }
        }
      });
    }
  }, [deleted, isSelected, getParentStageElem, getParentLayerElem, cRectangleDelete]);

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
          rotateEnabled={false}
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

