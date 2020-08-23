/* 
    Nessa arquivo declararei tudo o que for necessário para compor a Mesa.
    Criado unicamente para deixar o arquivo do Componente Mesa mais limpo e bonitinho.
*/

/* 
    Como a mesa deve ser montada:

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
        - Porta agulha de Hegar;
        - Porta agulha de Mathieu;
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

//===============Declarando a Linha Superior da Mesa=============================
//Primeira parte da linha superior
const sintese = [
    {
        nome: "Porta agulha de Hegar",
        função: "síntese",
        posicao: 0,
        resposta: false,
    },
    {
        nome: "Porta agulha de Mathieu",
        função: "síntese",
        posicao: 1,
        resposta: false,
    },
    {
        nome: "Pinça Anatômica",
        função: "síntese",
        posicao: 2,
        resposta: false,
    },
    {
        nome: "Pinça Dente de rato",
        função: "síntese",
        posicao: 3,
        resposta: false,
    },

]
//Segunda parte da linha superior
const preensao = [
    {
        nome: "Pean",
        função: "Preensão",
        posicao: 4,
        resposta: false,
    },
    {
        nome: "Cherron",
        função: "Preensão",
        posicao: 5,
        resposta: false,
    },
    {
        nome: "Backaus1",
        função: "Preensão",
        posicao: 6,
        resposta: false,
    },
    {
        nome: "Backaus2",
        função: "Preensão",
        posicao: 7,
        resposta: false,
    },
]
//Terceira parte da linha superior
const especiais = [
    {
        nome: "Afastador Farabeuf",
        função: "Especial",
        posicao: 8,
        resposta: false,
    },
]

const linhaDeCima = sintese.concat(preensao,especiais);

//===============Declarando a Linha Inferior da Mesa==============================
//Primeira parte da linha inferior
const dierese = [
    {
        nome: "Bisturi",
        função: "diérese",
        posicao: 9,
        resposta: false,
    },
    {
        nome: "Mayo curva",
        função: "diérese",
        posicao: 10,
        resposta: false,
    },
    {
        nome: "Mayo reta",
        função: "diérese",
        posicao: 11,
        resposta: false,
    },
    {
        nome: "Metzembaum curva",
        função: "diérese",
        posicao: 12,
        resposta: false,
    },
    {
        nome: "Metzembaum reta",
        função: "diérese",
        posicao: 13,
        resposta: false,
    },
];
//Segunda parte da linha inferior
const hemostasia = [
    {
        nome: "Hemostática Curva1",
        função: "hemostasia",
        posicao: 14,
        resposta: false,
    },
    {
        nome: "Hemostática Curva2",
        função: "hemostasia",
        posicao: 15,
        resposta: false,
    },
    {
        nome: "Hemostática Reta1",
        função: "hemostasia",
        posicao: 16,
        resposta: false,
    },
    {
        nome: "Hemostática Reta2",
        função: "hemostasia",
        posicao: 17,
        resposta: false,
    },
];

const linhaDeBaixo = dierese.concat(hemostasia);
export const MesaFinal = linhaDeBaixo.concat(linhaDeCima);

//=======================Declarando os gabaritos=====================================
//cirurgiao
export const gc = ["Porta agulha de Hegar", "Porta agulha de Mathieu", "Pinça Anatômica", "Pinça Dente de rato",
"Pean", "Cherron", "Backaus1", "Backaus2","Afastador Farabeuf","Bisturi", "Mayo curva", "Mayo reta",
"Metzembaum curva", "Metzembaum reta", "Hemostática Curva1","Hemostática Curva2","Hemostática Reta1","Hemostática Reta2"]; 
//instrumentador
export const gi = ["Afastador Farabeuf", "Pean", "Cherron", "Backaus1", "Backaus2", "Porta agulha de Hegar",
"Porta agulha de Mathieu", "Pinça Anatômica", "Pinça Dente de rato", "Hemostática Reta2","Hemostática Reta1",
"Hemostática Curva2","Hemostática Curva1", "Mayo reta", "Mayo curva", "Metzembaum reta", "Metzembaum curva", "Bisturi"];

//Método copiado do StackOverLoiro para randomizar o array todas as vezes
export function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;

      //Ajustando a posicao em cada objeto para deixar bacaninha pro estado
      array[currentIndex].posicao = currentIndex;
      array[randomIndex].posicao = randomIndex;

    }
  
    return array;
  }