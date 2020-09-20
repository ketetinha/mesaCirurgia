import React from 'react';
import './instrumento.css';
import { Draggable } from 'react-beautiful-dnd';

class Instrumento extends React.Component {

    //Ok, nesse onDragStart parece que salvamos as informações necessárias para depois
    onDragStart = (e, posicao, nome, funcao, resposta, src) => {
        e.dataTransfer.setData("posicao", posicao);
        e.dataTransfer.setData("nome", nome);
        e.dataTransfer.setData("funcao", funcao);
        e.dataTransfer.setData("resposta", resposta);
        e.dataTransfer.setData("src", src);
    }

    render(){
        return (
            <Draggable draggableId={this.props.inst.nome} index={this.props.inst.posicao}>
                {(provided) => (
                    <div className="container" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                        <img alt={this.props.inst.nome} className={this.props.inst.virada ? "imagemInstrumento face virada" : "imagemInstrumento face"}
                            src={this.props.inst.src}
                            //propriedade draggable deixa o componente ser arrastado
                            draggable onDragStart={(e)=>this.onDragStart(
                                e,
                                this.props.inst.posicao,
                                this.props.inst.nome,
                                this.props.inst.função,
                                this.props.inst.resposta,
                                this.props.inst.src
                        )}
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