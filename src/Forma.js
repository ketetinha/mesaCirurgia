import React from 'react';
import './Forma.css';
import Instrumento from './Instrumento';

class Forma extends React.Component {
    constructor(){
        super();
        //passei o estado de correto ou errado para o Mesa
        this.state = {
            resposta: false,
        }
    }

    definindoClasse = () => {
        //this.state.reposta ? "droppable correto" : "droppable errado"
        if(this.props.resposta){
            return "correto";
        } else {
            return "errado";
        }
    }
    render(){
        return (
            <div 
            className= {`droppable ${this.definindoClasse()}`} 
            onDrop={this.props.handleDrop}
            onDragOver={this.props.handleDragOver} 
            onClick={(posicao)=>this.props.handleC(this.props.inst.posicao)}
            >
                <Instrumento 
                inst={this.props.inst} 
                posicao={this.props.inst.posicao} 
                key={this.props.inst.nome} />
            </div>
        )
    }
}

export default Forma;