import React from 'react';
import { Arrow, Circle } from 'react-konva';

export const TestArrow = ({ shapeProps, isSelected, onSelect, onChange }) => {

    const arrowRef = React.useRef();
    const circle1Ref = React.useRef();
    const circle2Ref = React.useRef();

    const [ax1, setAx1] = React.useState(150);
    const [ay1, setAy1] = React.useState(150);

    const [ax2, setAx2] = React.useState(200);
    const [ay2, setAy2] = React.useState(0);

    const [x1, setX1] = React.useState(90);
    const [y1, setY1] = React.useState(90);

    const [x2, setX2] = React.useState(90);
    const [y2, setY2] = React.useState(90);

    React.useEffect(() => {
        arrowRef.current.getLayer().batchDraw();

        setX1(arrowRef.current.attrs.x);
        setY1(arrowRef.current.attrs.y);
        setX2(x1 + arrowRef.current.attrs.points[2]);
        setY2(y1 + arrowRef.current.attrs.points[3]);

        circle1Ref.current.attrs.x = x1;
        circle1Ref.current.attrs.y = y1;

        circle2Ref.current.attrs.x = x2;
        circle2Ref.current.attrs.y = y2;
    }, [x1, y1, x2, y2]);
      
    /*
    function updateLine() {
        const points = [
          anchor1.x(),
          anchor1.y(),
          anchor2.x(),
          anchor2.y(),
        ]
        line.points(points);
        layer.batchDraw();
      }
      
      anchor1.on('dragmove', updateLine);
      anchor2.on('dragmove', updateLine);
      
      layer.draw();
      */
    
    return (
        <React.Fragment>
            <Arrow
                ref={arrowRef}
                //onDragMove={updateLine}
                x= {ax1}
                y= {ay1}
                points = {[0, 0, ax2, ay2]}
                pointerLength = {20} 
                pointerWidth= {20}
                fill= 'Red'
                stroke= 'Red'
                strokeWidth= {5}
            />
            <Circle 
                ref={circle1Ref}
                x= {x1}
                y= {y1}
                radius = {10}
                fill = 'black' 
                draggable
                onDragMove={() => {
                    setAx1(circle1Ref.current.attrs.x);
                    setAy1(circle1Ref.current.attrs.y);

                    setX2(arrowRef.current.attrs.x + ax2);
                    setY2(arrowRef.current.attrs.y + ay2);
                }}
            />
            <Circle 
                ref={circle2Ref}
                x={x2}
                y= {y2}
                radius = {10}
                fill= 'black'
                draggable
                onDragMove={() => {
                    setAx2(circle2Ref.current.attrs.x - x1);
                    setAy2(circle2Ref.current.attrs.y - y1);
                }}
            />
        </React.Fragment>
    );
    
}
