import React from 'react';
//importando os exemplos de mesas corretas
import mesaI from './imagens/mesaI.jpg';
import mesaC from './imagens/mesaC.jpg';

class Resposta extends React.Component {
    render(){
        return(
        <div>
            <img className="exemplo" src={mesaC} alt="mesa cirurgião"></img>
            <img className="exemplo" src={mesaI} alt="mesa instrumentador"></img>
        </div>)
    }

}

export default Resposta;