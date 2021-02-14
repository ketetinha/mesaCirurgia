import React from 'react';

// external APIs
import { Droppable } from 'react-beautiful-dnd';

// components
import Instrumento from './../Instrumento';

// assets
import './Forma.css';

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
            <Droppable droppableId={this.props.inst.nome}>
                {(provided) => (
                    <div
                    //react-beautiful-dnd's props
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    //my props
                    className= {`droppable ${this.definindoClasse()}`} 
                    onDrop={this.props.handleDrop}
                    onDragOver={this.props.handleDragOver} 
                    onClick={(posicao)=>this.props.virarCarta(this.props.inst.posicao)}
                    >
                        {provided.placeholder}
                        <Instrumento 
                        inst={this.props.inst} 
                        posicao={this.props.inst.posicao} 
                        key={this.props.inst.nome} />
                    </div>
                )}
            </Droppable>
        )
    }
}

export default Forma;