import { Text } from 'react-konva';

let rendexText = (text) => {
    /*state = {
        isDragging: false,
        x: 10,
        y: 210, 
    }*/
    

    return (
       <Text
        text="Drag this text!"
        fontSize={30}
        fontFamily='Calibri'
        x={text.x}
        y={text.y}
        draggable
        /*
        fill={this.state.isDragging ? 'green' : 'red'}
        onDragStart = { () => {
            this.setState({
                isDragging: true
            })
        }}
        onDragEnd  = { e => {
            this.setState({
                isDragging: false,
                x: e.target.x(),
                y: e.target.y()
            })
        }}*/
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