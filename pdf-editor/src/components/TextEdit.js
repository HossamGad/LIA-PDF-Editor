import React from 'react';
import { Text, Transformer } from 'react-konva';

export const textArray = [];

const addTexts = (p, id, x, y, txt) => {

  if(p === undefined) {
    return;
  }

  if(Number(id.charAt(4)) > textArray.length) {
    textArray.push({pg: p, id: id, x: x, y: y, text: txt});
  }

  for(let i = 0; i < textArray.length; i++){ 
    
    if ( textArray[i].id === id) { 

      textArray[i].x = x;
      textArray[i].y = y;
      textArray[i].text = txt;

    }
  }

};

export const TextEdit = ({ shapeProps, isSelected, onSelect, onChange, cText }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  const [visible, setVisible] = React.useState(true);
  const [deleted, setDeleted] = React.useState(false);

  const [tx1, setTx1] = React.useState(0);
  const [ty1, setTy1] = React.useState(0);
  const [txt, setTxt] = React.useState(shapeProps.text);


  React.useEffect(() => {

    setTx1(shapeRef.current.attrs.x);
    setTy1(shapeRef.current.attrs.y);

    let pageNumSpan = document.getElementById('page-num');

    addTexts(pageNumSpan.innerText, shapeProps.id, tx1, ty1, txt);
  
  }, [setTx1, setTy1, setTxt, tx1, ty1, txt, shapeProps]);

  React.useLayoutEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);

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

                trNode.destroy();
                textNode.destroy();

                for(let a = 0; a < textArray.length; a++) {
                  if(textArray[a].id === textNode.attrs.id)
                    textArray.splice(a, 1);
                }

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

              textNode.text(textArea.value);

              if(visible === true)
              {
                setTxt(textArea.value);
                textArea.parentNode.removeChild(textArea);

                cText(textNode.attrs.id, textArea.value);

                textNode.show();
                tr.show();
                onSelect();
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
