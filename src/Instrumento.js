import React from 'react';
import './instrumento.css';

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
            <div>
                <p>{this.props.inst.nome}</p>
            <img alt={this.props.inst.nome} className="imagemInstrumento" src={this.props.inst.src}
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
            </div>
        );
    }
}

export default Instrumento;