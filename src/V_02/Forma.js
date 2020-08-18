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

    //passei o handleDrop para o Mesa
    //Método que troca os instrumentos de lugar
    handleDrop = (e, item, estado) => {          
        console.log(this);
        //Instrumento que está sendo movimentado
         let movido = {
            nome: e.dataTransfer.getData("nome"),
            função: e.dataTransfer.getData("funcao"),
            posicao: item.posicao,
        }
        //Instrumento que está sendo substituído 
        let estatico = {
            nome: item.nome,
            função: item.função,
            posicao: parseInt(e.dataTransfer.getData("posicao")),
        }
        //Copio o estado atual da Mesa e faço as devidas alterações.
        let newState = estado;
        newState[item.posicao] = movido;
        newState[parseInt(e.dataTransfer.getData("posicao"))] = estatico;
        //Acertou = Caixa verde | Errou = Caixa vermelha
        let resposta_nova;
        if(e.dataTransfer.getData("nome")===this.props.gabarito[item.posicao]){
            //Se os nomes são compatíveis, acertou a posição. Resposta = true.
            resposta_nova = true;
            //Confiro para ver se a resposta já não é a mesma para não ter que renderizar novamente.
            if(resposta_nova!==this.state.resposta){
                this.setState({resposta: resposta_nova});
            }
        } else {
            //Errou a resposta, então ela será false.
            resposta_nova = false;
            //Confiro para ver se a resposta já não é a mesma para não ter que renderizar novamente.
            if(resposta_nova!==this.state.resposta){
                this.setState({resposta: resposta_nova});
            }
        }
        this.props.setStateMesa({dierese: newState});
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
            >
                <Instrumento 
                inst={this.props.inst} 
                posicao={[1,this.props.inst.posicao]} 
                key={this.props.inst.nome} />
            </div>
        )
    }
}

export default Forma;