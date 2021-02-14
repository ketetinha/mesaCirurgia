import React from 'react';

// external APIs
import { Draggable } from 'react-beautiful-dnd';

// assets
import './instrumento.css';

class Instrumento extends React.Component {
    render(){
        return (
            <Draggable draggableId={this.props.inst.nome} index={this.props.inst.posicao}>
                {(provided) => (
                    <div className="container" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                        <img alt={this.props.inst.nome} className={this.props.inst.virada ? "imagemInstrumento face virada" : "imagemInstrumento face"}
                            src={this.props.inst.src}
                        ></img>
                        <div className={this.props.inst.virada ? "face faceInfo" : "face faceInfo virada"}>
                            <p>Nome: {this.props.inst.nome}</p>
                            <p>Função: {this.props.inst.função}</p>
                        </div>
                    </div>
                )}
            </Draggable>
        );
    }
}

export default Instrumento;