import React from 'react';
import './instrumento.css';

/* 
    Ok. Comecemos falando sobre os instrumentos: São 15 pelo que contei de uma foto. Quais?
    Dividindo a mesa em quatro quadrantes, temos a diérese, síntese, hemostasia e preensão.
    -OBS: Se for do feitio da cirurgia, podemos ter um quadrante especial chamado: Especiais.-
    Então, seguindo a lógica de uma cirurgia comum, teremos:
    1)Diérese:
        - Bisturi (ou simplesmente o cabo do bisturi);
        - Tesoura curva de Metzembaum; 
        - Tesoura reta de Metzembaum;
        - Tesoura curva de Mayo;
        - Tesoura reta de Mayo.
    2)Síntese:
        - Porta agulha de Mathieu;
        - Porta agulha de Hegar;
        - Pinça Anatômica;
        - Pinça Dente de rato.
    3)Hemostasia:
        - Hemostática curva (Um conjunto dessas peças);
        - Hemostática reta (Um conjunto dessas peças).
    4)Preensão:
        - Pean; 
        - Cherron;
        - Backaus (Conjunto dessas peças);
    5)Especiais:
        - Farabeuf (Geralmente esse afastador).
                            
*/

class Instrumento extends React.Component {

    //Ok, nesse onDragStart parece que salvamos as informações necessárias para depois
    onDragStart = (e, posicao, nome, funcao, resposta) => {
        e.dataTransfer.setData("posicao", posicao);
        e.dataTransfer.setData("nome", nome);
        e.dataTransfer.setData("funcao", funcao);
        e.dataTransfer.setData("resposta", resposta);
    }

    render(){
        return (
            //propriedade draggable deixa o componente ser arrastado
            <div draggable onDragStart={(e)=>this.onDragStart(
                e,
                this.props.inst.posicao,
                this.props.inst.nome,
                this.props.inst.função,
                this.props.inst.resposta,
            )}>
                <p className="Instrumento">{this.props.inst.nome}</p>
            </div>
        );
    }
}

export default Instrumento;