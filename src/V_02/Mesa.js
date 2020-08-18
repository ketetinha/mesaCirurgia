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
        resposta: false,
    },
    {
        nome: "Mayo curva",
        função: "diérese",
        posicao: 1,
        resposta: false,
    },
    {
        nome: "Metzembaum reta",
        função: "diérese",
        posicao: 2,
        resposta: false,
    },
    {
        nome: "Metzembaum curva",
        função: "diérese",
        posicao: 3,
        resposta: false,
    },
    {
        nome: "Bisturi",
        função: "diérese",
        posicao: 4,
        resposta: false,
    },
];

/*
    Um Array constante com as respostas certas para a área de Diérese. Foi a solução encontrada
    por mim para manter uma forma de ter um gabarito. Havia a dificuldade de passar o gabarito 
    nos componentes pois eles sempre se alteravam em cada chamada do render() a cada mudança de estado.
*/
const gabarito_dierese = ["Bisturi", "Mayo reta", "Mayo curva", "Metzembaum reta", "Metzembaum curva"];


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

    //Método que troca os instrumentos de lugar
    handleDrop = (e, item) => {          
        console.log(this);
        //Instrumento que está sendo movimentado
         let movido = {
            nome: e.dataTransfer.getData("nome"),
            função: e.dataTransfer.getData("funcao"),
            posicao: item.posicao,
            resposta: e.dataTransfer.getData("resposta"),
        }
        //Instrumento que está sendo substituído 
        let estatico = {
            nome: item.nome,
            função: item.função,
            posicao: parseInt(e.dataTransfer.getData("posicao")),
            resposta: item.resposta,
        }
        
        //Checagem de acerto para o que foi movimentado
        let resposta_nova;
        if(e.dataTransfer.getData("nome")===gabarito_dierese[item.posicao]){
            console.log("FINAL CHEGOU AQUI")
            resposta_nova = true;
            movido.resposta = resposta_nova;
        } else {
            console.log("FALSO")
            resposta_nova = false;
            movido.resposta = resposta_nova;
        }

        //Checagem de acerto para o que foi movimetado de tabela (aka estatico)
        if(item.nome===gabarito_dierese[e.dataTransfer.getData("posicao")]){
            resposta_nova = true;
            estatico.resposta = resposta_nova;
        } else {
            resposta_nova = false;
            estatico.resposta = resposta_nova;
        }

        //Copio o estado atual da Mesa e faço as devidas alterações.
        let newState = this.state.dierese;
        newState[item.posicao] = movido;
        newState[parseInt(e.dataTransfer.getData("posicao"))] = estatico;
        console.log("FEZ AS ALTERAÇÕES")


        //Altero o estado e renderizo novamente a tela
        this.setState({dierese: newState});
        console.log("MUDOU O ESTADO");
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
                    this.state.dierese.map((item)=>
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













/* let resposta_nova;
        if(e.dataTransfer.getData("nome")===gabarito_dierese[item.posicao]){
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
        } */