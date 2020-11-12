import { Rect } from 'react-konva';

let rendexBox = (box) => {

    

    return (<Rect
        x={box.x}
        y={box.y}
        draggable
        width={150}
        height={30}
        fill={box.color}
        opacity={0.6}
    />
    );
}

export function Boxes(props) {
    return (
        <>
            {props.boxes.map(b => rendexBox(b))}
        </>
    );
} 