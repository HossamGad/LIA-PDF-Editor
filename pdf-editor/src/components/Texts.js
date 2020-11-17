import { Text } from 'react-konva';

let rendexText = (text) => {

    return (
       <Text
            text= 'Drag this text'
            fontSize={30}
            fontFamily='Calibri'
            x={text.x}
            y={text.y}
            draggable

            onClick={() => { 
                alert('text clicked');
            }}
        />
    );
}

export function Texts(props) {

    return (
        <>
            {props.texts.map(c => rendexText(c))}
        </>
    );
} 