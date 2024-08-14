let numeroLimite = 10;
let listaDeNumerosSorteados = [];
let numeroSecreto = gerarNumero();
let tentativa = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto , 'Brazilian Portuguese Female', {rate:1.2} );
}

function exibirMensagem(tag, texto) {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagem();

function verificarChute () {
    let chute = document.querySelector('input').value;
    if ( chute == numeroSecreto) {
        exibirTextoNaTela('h1','Acertou!');
        let palavaraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativa} ${palavaraTentativa}`; 
        exibirTextoNaTela('p', mensagemTentativas);
        ativarBotao();

    } else {
        if ( chute < numeroSecreto ){
            exibirTextoNaTela('p', `Você errou, o número é maior que ${chute}`);
        } else {
            exibirTextoNaTela('p', `Você errou, o número é menor que ${chute}`);
        }
        tentativa++;
        limparCampo()
    }
}

function gerarNumero() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaDeNumerosSorteados.length;
    if (quantidadeElementosLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumero();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados); 
        return numeroEscolhido;
    }

}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value="";
}

function ativarBotao() {
    document.getElementById('reiniciar').removeAttribute('disabled');
}

function reiniciarJogo() {
    document.getElementById('reiniciar').setAttribute('disabled', true);
    numeroSecreto = gerarNumero();
    limparCampo();
    exibirMensagem();
    tentativa = 1;
}