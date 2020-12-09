import React from 'react';
import { Text, Transformer } from 'react-konva';

export const textArray = [];

const importTexts = (p, id, x, y, txt) => {

  if(p === undefined) {
    return;
  }

  for(let i = 0; i < textArray.length; i++){ 
    
    if ( textArray[i].id === 'text'+JSON.stringify(i+1)) { 

      textArray.splice(i, 1);
    }
  }
  
  textArray.push({pg: p, id: id, x: x, y: y, text: txt});
  console.log(textArray);
};

export const TextEdit = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  const [visible, setVisible] = React.useState(true);
  const [deleted, setDeleted] = React.useState(false);

  const [tx1, setTx1] = React.useState(0);
  const [ty1, setTy1] = React.useState(0);

  React.useEffect(() => {

    setTx1(shapeRef.current.attrs.x);
    setTy1(shapeRef.current.attrs.y);

    let pageNumSpan = document.getElementById('page-num');

    let txt = shapeProps.text;

    importTexts(pageNumSpan.innerText, shapeProps.id, tx1, ty1, txt);
  
  }, [setTx1, setTy1, tx1, ty1, shapeProps]);

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
              const textNode = shapeRef.current;
              const trNode = trRef.current
              
              if(trNode === null) {
                return;
              } else {
                //trRef.destroy();
                textNode.destroy();
              } 
            }
        }
      });
    }
  }, [deleted, isSelected]);

  return (
    <React.Fragment>
      <Text
        onClick={onSelect}
        onTap={onSelect}
        onDblClick={(e) => {
          
          const textNode = shapeRef.current;
          const tr = trRef.current;
          
          setVisible(false);
          setDeleted(true);

          
          textNode.hide();
          tr.hide();
          

          let topBar = document.getElementById('test-div');
          let textArea = document.createElement('textarea');
          topBar.appendChild(textArea);

          textArea.setAttribute('id', 'txt-area');
          
          textArea.value = textNode.text();
          textArea.addEventListener('keydown', function(e) {
            if(e.keyCode === 13) {

              setVisible(true);

              if(visible === true)
              {
                textNode.text(textArea.value);
                textArea.parentNode.removeChild(textArea);

                textNode.show();
                tr.show();
              } 
            }
          })
        }}
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
          onClick={() => {alert('test')}}
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
