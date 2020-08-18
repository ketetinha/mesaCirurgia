import React from 'react';
import './Mesa.css';
import Forma from './Forma';

/* 
    Como a mesa deve ser montada( considerando os instrumentos citados no arq. Instrumento.js):

    Cirurgião montando:     Auxiliar montando:    
            |                       |   
    Síntese | Preensão      Preensão| Síntese
            |                       |
    --------|-----------    --------|---------
            |                       |
            |                       |
    Diérese | Hemostasia    Hemosta | Diérese
            |                       |
            |                       |                                    
            |                       |     
*/

/*
    Render errado. Idealmente seria legal colocá-los em ordem aleatória toda vez que a pessoa
    carregasse a página para dar uma sensação de dificuldade real, possibilitando que ela se 
    deparasse com diversas possibilidades e estivesse realmente preparada para a prova.
*/
const dierese = [
    {
        nome: "Mayo reta",
        função: "diérese",
        posicao: 0,
    },
    {
        nome: "Mayo curva",
        função: "diérese",
        posicao: 1,
    },
    {
        nome: "Metzembaum reta",
        função: "diérese",
        posicao: 2,
    },
    {
        nome: "Metzembaum curva",
        função: "diérese",
        posicao: 3,
    },
    {
        nome: "Bisturi",
        função: "diérese",
        posicao: 4,
    },
];

/*
    Um Array constante com as respostas certas para a área de Diérese. Foi a solução encontrada
    por mim para manter uma forma de ter um gabarito. Havia a dificuldade de passar o gabarito 
    nos componentes pois eles sempre se alteravam em cada chamada do render() a cada mudança de estado.
*/
const dierese_correta = ["Bisturi", "Mayo reta", "Mayo curva", "Metzembaum reta", "Metzembaum curva"];


/* 
    Componente "Mesa" que simplesmente renderiza todos os outros componentes e mantêm controle
    sobre a posição de todos os componentes. É o mastermind do estado do jogo.
*/
class Mesa extends React.Component { 
    constructor(props){
        super(props);
        this.state={
            dierese: dierese,
        }
    }

    setandoEstado = (newState) => {
        this.setState(newState);
    }

    render(){
        return (
            <div className="">
                <div className="gridzin">
                    {
                    dierese.map((item)=>
                    <Forma
                    key={item.nome} 
                    estado={this.state.dierese} 
                    inst={item} //passando o instrumento para o componente mais embaixo
                    gabarito={dierese_correta}
                    setStateMesa = {this.setandoEstado}
                    >
                     
                    </Forma>)
                    }
                </div>
            </div>
        );
    }
}

export default Mesa;