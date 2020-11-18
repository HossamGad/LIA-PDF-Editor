import React from 'react';
import { Text, Transformer } from 'react-konva';

export const TextEdit = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Text
        onClick={onSelect}
        onTap={onSelect}
        onDblClick={() => {
          
          const textNode = shapeRef.current;
          const tr = trRef.current;
          
          setVisible(false);

          if(visible === false) {
            textNode.hide();
            tr.hide();
          }

          let textPosition = textNode.absolutePosition();

          console.log(textPosition);

          let topBar = document.getElementById('tbar');
          let textArea = document.createElement('textarea');

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

          topBar.appendChild(textArea);

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
