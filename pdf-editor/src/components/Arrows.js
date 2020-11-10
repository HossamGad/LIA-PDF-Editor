import { Arrow } from 'react-konva';

let rendexArrow = (arrow) => {
    return (<Arrow
        x={arrow.x}
        y={arrow.y}
        draggable
        points= {[0, 0, 100, 100]}
        pointerLength= {20}
        pointerWidth= {20}
        fill='Red'
        stroke='Red'
        strokeWidth= {5}
    />
    );
}

export function Arrows(props) {
    return (
        <>
            {props.arrows.map(a => rendexArrow(a))}
        </>
    );
} 