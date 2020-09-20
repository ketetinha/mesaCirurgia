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


    handleClick2 = (posicao) => {
        let newMesa = this.state.Mesa;
        newMesa[posicao].virada = !newMesa[posicao].virada;
        this.setState({Mesa: newMesa});
    }

    onDragEnd = (result) =>{
        const { destination, source } = result;
        if(!destination) return; //se a pessoa jogar em um local que não encaixa
        if(destination.index === source.index){
            return;
        } //se a pessoa colocar o instrumento no mesmo lugar
        //Instrumento que está sendo movimentado
        let movido = this.state.Mesa[source.index];

        //Instrumento que está sendo substituído 
        let estatico = this.state.Mesa[destination.index];

        //trocando as posições dos instrumentos movimentados
        let tmp = movido.posicao;
        movido.posicao = estatico.posicao;
        estatico.posicao = tmp;

        //Checagem de acerto para o que foi movimentado
        let resposta_nova;
        if(movido.nome===this.state.gabarito[movido.posicao]){
            resposta_nova = true;
            movido.resposta = resposta_nova;
        } else {
            resposta_nova = false;
            movido.resposta = resposta_nova;
        }

        //Checagem de acerto para o que foi movimentado de tabela (aka estatico)
        if(estatico.nome===this.state.gabarito[estatico.posicao]){
            resposta_nova = true;
            estatico.resposta = resposta_nova;
        } else {
            resposta_nova = false;
            estatico.resposta = resposta_nova;
        }

        //Copio o estado atual da Mesa e faço as devidas alterações.
        let newState = this.state.Mesa;
        newState[movido.index] = movido;
        newState[estatico.index] = estatico;

        let finalizou = true;
        for(let i=0; i<newState.length; i++){
            //se estiver false(errado), dou um break
            if(!newState[i].resposta){
                finalizou = false;
                break;
            }
        }

        console.log(newState);
        //Altero o estado e renderizo novamente a tela
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
                        this.state.Mesa.map((item, index)=>
                        <Forma
                            resposta = {item.resposta}
                            handleDrop={(e)=>this.handleDrop(e, item)}
                            handleDragOver={(e)=>this.handleDragOver(e)}
                            handleC={(posicao)=>this.handleClick2(posicao)}
                            key={item.nome} 
                            inst={item} 
                            index={index} //aqui eu passo a posição ??? pensar melhor nas soluções
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



