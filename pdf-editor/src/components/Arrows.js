import React from 'react';
import { Arrow, Rect } from 'react-konva';

export const Arrows = ({ shapeProps, isSelected, onSelect, onChange }) => {

    const arrowRef = React.useRef();
    const circle1Ref = React.useRef();
    const circle2Ref = React.useRef();

    const [ax1, setAx1] = React.useState(150);
    const [ay1, setAy1] = React.useState(150);

    const [ax2, setAx2] = React.useState(100);
    const [ay2, setAy2] = React.useState(100);

    const [x1, setX1] = React.useState(90);
    const [y1, setY1] = React.useState(90);

    const [x2, setX2] = React.useState(90);
    const [y2, setY2] = React.useState(90);

    React.useEffect(() => {

        setX1(arrowRef.current.attrs.x - 5);
        setY1(arrowRef.current.attrs.y - 5);

        setX2(arrowRef.current.attrs.x + arrowRef.current.attrs.points[2] - 5);
        setY2(arrowRef.current.attrs.y + arrowRef.current.attrs.points[3] - 5);

        if(isSelected) {
            circle1Ref.current.attrs.x = x1;
            circle1Ref.current.attrs.y = y1;

            circle2Ref.current.attrs.x = x2;
            circle2Ref.current.attrs.y = y2;
        } 

    }, [x1, y1, x2, y2, isSelected]);

    const [deleted, setDeleted] = React.useState(false);

    React.useEffect(() => {
        if (isSelected) {
            document.addEventListener("keydown", function(event) {
              if (event.key === 'Delete') {
                setDeleted(true);
      
                setDeleted(false);
                  if(deleted === false) {
                    const arrowNode = arrowRef.current;
                    const circle1Node = circle1Ref.current;
                    const circle2Node = circle2Ref.current;
                    
                    if(circle1Node === null) {
                        return;
                    } else {
                        circle1Node.destroy();
                        circle2Node.destroy();
                        arrowNode.destroy();
                    }   
                  }
              }
            });
          }

    }, [deleted, isSelected]);
    
    return (
        <React.Fragment>
            <Arrow
                onClick={onSelect}
                onTap={onSelect}
                ref={arrowRef}
                {...shapeProps}
                x= {ax1}
                y= {ay1}
                points = {[0, 0, ax2, ay2]}
                pointerLength = {20} 
                pointerWidth= {20}
                fill= 'Red'
                stroke= 'Red'
                strokeWidth= {5}
                draggable
                onDragMove={() => {
                    setX1(arrowRef.current.attrs.x);
                    setY1(arrowRef.current.attrs.y);
                }}
            />
            {isSelected && <Rect 
                ref={circle1Ref}
                x= {x1}
                y= {y1}
                width= {10}
                height={10}
                closed
                stroke="lightblue"
                fill = 'white' 
                draggable
                onDragMove={() => {
                    setAx1(circle1Ref.current.attrs.x + 5);
                    setAy1(circle1Ref.current.attrs.y + 5);

                    setAx2(circle2Ref.current.attrs.x - circle1Ref.current.attrs.x);
                    setAy2(circle2Ref.current.attrs.y - circle1Ref.current.attrs.y);
                }}
            />}
            {isSelected && <Rect 
                ref={circle2Ref}
                x= {x2}
                y= {y2}
                width= {10}
                height= {10}
                closed
                stroke="lightblue"
                fill= 'white'
                draggable
                onDragMove={() => {
                    setAx2(circle2Ref.current.attrs.x - circle1Ref.current.attrs.x);
                    setAy2(circle2Ref.current.attrs.y - circle1Ref.current.attrs.y);
                }}
            />}
        </React.Fragment>
    );
    
}
