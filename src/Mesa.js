import React from 'react';
import Switch from 'react-switch';
import './Mesa.css';
import Forma from './Forma';
import Resposta from './Resposta';
import {DragDropContext} from 'react-beautiful-dnd';

//Importando os instrumentos de outro arquivo
import {MesaFinal} from './Definição_instrumentos';
import {shuffle} from './Definição_instrumentos';
import {gc} from './Definição_instrumentos';
import {gi} from './Definição_instrumentos';

//Importando imagens
import bisturi from './imagens/cabo_bisturi.jpg';
import mayoc from './imagens/mayo_curva.jpg';
import mayor from './imagens/mayo_reta.jpg';
import metzembaumc from './imagens/metzembaum curva.jpg';
import metzembaumr from './imagens/metzembaum reta.jpg';
import hemoc from './imagens/hemo_curva.jpg';
import hemor from './imagens/hemo_reta.jpg';
import paHegar from './imagens/porta agulha de hegar.jpg';
import paM from './imagens/porta_agulha_M.jpg';
import pinçaA from './imagens/pinça_anatômica.jpg';
import pinçaR from './imagens/pinça_dente.jpg';
import pean from './imagens/pean.jpg';
import cherron from './imagens/cherron.jpg';
import backaus from './imagens/backaus.jpg';
import farabeuf from './imagens/farabeuf.jpg';

//Colocando as imagens em um array para passar para os componentes filhos
const imagens = [bisturi, mayoc, mayor, metzembaumc, metzembaumr, hemoc, hemoc, hemor, hemor, paHegar, paM,
    pinçaA, pinçaR, pean, cherron, backaus, backaus, farabeuf];

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
        super();
        this.state={
            checked: true,
            Mesa: shuffle(MesaFinal),
            gabarito: this.montarMesa(true),
            verGabarito: false,
            finalizou: false, 
        }
    }

    //Método para montar a mesa
    montarMesa = (checked) => {
        //TRUE: cirurgiao e FALSE: auxiliar
        return checked ? gc : gi;
    }

    //não sei para que serve, mas precisa estar aqui pelo visto
    handleDragOver = (e) => {
        e.preventDefault();
    }

    handleClick = (e) => {
        let mesa = this.state.Mesa;
        for(let i=0; i<mesa.length; i++){
            mesa[i].resposta = false;
            mesa[i].virada = false;
        }
        this.setState({Mesa: shuffle(mesa), finalizou: false});
    }

    handleChange = (checked) => {
        let gabarito = this.montarMesa(checked);
        let mesa = this.state.Mesa;
        for(let i=0; i<mesa.length; i++){
            mesa[i].resposta = false;
            mesa[i].virada = false;
        }
        this.setState(
            {
                checked: checked,
                Mesa: shuffle(mesa),
                gabarito: gabarito,
                finalizou: false, 
            });
    }

    handleGabarito = () => {
        //let mudança = !(this.state.verGabarito)
        this.setState({verGabarito: !(this.state.verGabarito)});
    }


    handleVirarCarta = (posicao) => {
        let newMesa = this.state.Mesa;
        newMesa[posicao].virada = !newMesa[posicao].virada;
        this.setState({Mesa: newMesa});
    }

    onDragEnd = (result) =>{
        if(!result.destination) return; //If the user throws the card in the void
        if(result.destination.droppableId === result.source.droppableId){
            return;
        } //If the user puts the card in the same place

        //Searching for both objects in my current State
        let source = this.state.Mesa[result.source.index];
        let destination = this.state.Mesa[result.destination.index-1];

        //Switching positions between the objects
        let tmp = source.posicao;
        source.posicao = destination.posicao;
        destination.posicao = tmp;

        //Checking if the SOURCE card has been put in the right place
        let newAnswer;
        if(source.nome===this.state.gabarito[source.posicao]){
            newAnswer = true;
            source.resposta = newAnswer;
        } else {
            newAnswer = false;
            source.resposta = newAnswer;
        }

        //Checking if the DESTINATION card has been put in the right place
        if(destination.nome===this.state.gabarito[destination.posicao]){
            newAnswer = true;
            destination.resposta = newAnswer;
        } else {
            newAnswer = false;
            destination.resposta = newAnswer;
        } 

        //Creating and editing the new State
        let newState = this.state.Mesa;
        newState[source.posicao] = source;
        newState[destination.posicao] = destination;

        //Checking if the person finally assembled the whole table correctly
        let finalizou = true;
        for(let i=0; i<newState.length; i++){
            //if false, I'll assign it to false and break the loop.
            if(!newState[i].resposta){
                finalizou = false;
                break;
            }
        }
        //Finally updating the state
        this.setState({Mesa: newState, finalizou: finalizou});
    }

    render(){
        return (
            
            <div className="Mesa">
                <div className="header">
                    <h1 >Mesa do {this.state.checked ? "Cirurgião" : "Auxiliar/Instrumentador"}</h1>
                    {this.state.finalizou ? <h2>Parabéns!</h2> : null}
                    <div>
                        <button className="btn_reset" onClick={this.handleClick}>Reiniciar</button>
                        <Switch 
                            onChange={this.handleChange} 
                            checked={this.state.checked} 
                            uncheckedIcon={false} 
                            checkedIcon={false} 
                            offColor={"#080"}
                        />
                    </div>
                </div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="gridzin">
                        {
                        this.state.Mesa.map((item)=>
                        <Forma
                            resposta = {item.resposta}
                            handleDrop={(e)=>this.handleDrop(e, item)}
                            handleDragOver={(e)=>this.handleDragOver(e)}
                            virarCarta={(posicao)=>this.handleVirarCarta(posicao)}
                            key={item.nome} 
                            inst={item} 
                        ></Forma>)
                        }
                    </div>
                </DragDropContext>
                <p>OBS: Não está ideal para treinar a mesa do instrumentador ainda.</p>
                <p>OBS2: Quando o jogo começa, mesmo que um instrumento esteja no lugar certo, ele vai ficar como errado. Cabe a você organizar todos eles para saber se estão certos ou não.</p>
                <p>Regras:</p>
                <ul>
                    <li>Os objetos deverão ser colocados na ordem correta de acordo com a opção que você escolher( Cirurgião ou Instrumentador);</li>
                    <li>Ele não apresentará a borda vermelha quando encaixar ele na posição correta;</li>
                    <li>Por lógica, quando estiver errado, haverá uma borda vermelha indicando;</li>
                    <li>Clicando na carta do instrumento, você poderá ver seus detalhes(nome e função);</li>
                    <li>É apenas isso. Bom treinamento.</li>
                </ul>
                <button onClick={this.handleGabarito}>Ver gabarito:</button>
                {!this.state.verGabarito ? null : <Resposta/>}
            </div>
        );
    }
}

export default Mesa;