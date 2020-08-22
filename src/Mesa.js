import React from 'react';
import './Mesa.css';
import Forma from './Forma';

//Importando os instrumentos de outro arquivo
import {MesaFinal} from './Definição_instrumentos';
import {gabarito_geral} from './Definição_instrumentos';
import {shuffle} from './Definição_instrumentos';

//Importando imagens
import bisturi from './imagens/bisturi loiro.jpeg'
import mayoloira from './imagens/mayoloira.jpeg'
import metzembaum from './imagens/metzembaum loira.jpeg'
import pAHegar from './imagens/porta agulha de hegar.jpeg'

//Colocando as imagens em um array para passar para os componentes filhos
const imagens = [bisturi, mayoloira, metzembaum, pAHegar];

//Colocando as imagens como o source dos instrumentos
for(let i=0; i<MesaFinal.length; i++){
    MesaFinal[i].src = imagens[i];
}

/* 
    Componente "Mesa" que simplesmente renderiza todos os outros componentes e mantêm controle
    sobre a posição de todos os componentes. É o mastermind do estado do jogo.
*/
class Mesa extends React.Component { 
    constructor(props){
        super(props);
        this.state={
            MesaFinal: shuffle(MesaFinal),
        }
    }

    //Método que troca os instrumentos de lugar
    handleDrop = (e, item) => {
        //Instrumento que está sendo movimentado
         let movido = {
            nome: e.dataTransfer.getData("nome"),
            função: e.dataTransfer.getData("funcao"),
            posicao: item.posicao,
            resposta: e.dataTransfer.getData("resposta"),
             src: e.dataTransfer.getData("src")
        }

        //Instrumento que está sendo substituído 
        let estatico = {
            nome: item.nome,
            função: item.função,
            posicao: parseInt(e.dataTransfer.getData("posicao")),
            resposta: item.resposta,
            src: item.src
        }
        
        //Checagem de acerto para o que foi movimentado
        let resposta_nova;
        if(e.dataTransfer.getData("nome")===gabarito_geral[item.posicao]){
            resposta_nova = true;
            movido.resposta = resposta_nova;
        } else {
            resposta_nova = false;
            movido.resposta = resposta_nova;
        }

        //Checagem de acerto para o que foi movimetado de tabela (aka estatico)
        if(item.nome===gabarito_geral[e.dataTransfer.getData("posicao")]){
            resposta_nova = true;
            estatico.resposta = resposta_nova;
        } else {
            resposta_nova = false;
            estatico.resposta = resposta_nova;
        }

        //Copio o estado atual da Mesa e faço as devidas alterações.
        let newState = this.state.MesaFinal;
        newState[item.posicao] = movido;
        newState[parseInt(e.dataTransfer.getData("posicao"))] = estatico;

        //Altero o estado e renderizo novamente a tela
        this.setState({dierese: newState});
    }

    //não sei para que serve, mas precisa estar aqui pelo visto
    handleDragOver = (e) => {
        e.preventDefault();
    }

    render(){
        return (
            <div className="">
                <div className="gridzin">
                    {
                    this.state.MesaFinal.map((item)=>
                    <Forma
                        resposta = {item.resposta}
                        handleDrop={(e)=>this.handleDrop(e, item)}
                        handleDragOver={(e)=>this.handleDragOver(e)}
                        key={item.nome} 
                        inst={item} 
                    ></Forma>)
                    }
                </div>
            </div>
        );
    }
}

export default Mesa;