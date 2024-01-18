let listaDeNumerosSorteados = [];
let tentativas = 0;
let numeroMaximo = 2;
let numeroSecreto = gerarNumeroAleatorio();


responsiveVoice.OnVoiceReady = function () {
	        console.log("As vozes estão prontas!");
			mensagemInicial();
	    }

function alterarTag (tag, texto1) {
	let campo = document.querySelector(tag);
	campo.innerHTML = texto1;
	// Responsive voice não se encontra aqui devido a um erro no qual se duas strings fossem transmitidas para ele em sequência ele falaria apenas a segunda.
}

function gerarNumeroAleatorio() {
	let numeroSorteado = parseInt(Math.random() * numeroMaximo +1);

	if (listaDeNumerosSorteados.length == numeroMaximo){
		listaDeNumerosSorteados = [];
		alert("O jogo foi reiniciado!");
	}

	if (listaDeNumerosSorteados.includes(numeroSorteado)){
		return gerarNumeroAleatorio();
	}
	listaDeNumerosSorteados.push(numeroSorteado);
	return numeroSorteado;

}

function verificarChute()  {
	tentativas++;
	let chute = parseInt(document.querySelector('input').value);
	if (chute == numeroSecreto) {
		let texto = tentativas == 1 ? `Parabéns, você acertou em apenas ${tentativas} tentativa.` : `Parabéns, você acertou em apenas ${tentativas} tentativas.`
		alterarTag('p', texto);
		alterarTag('h1', 'Acertou!')

		// Fiz dessa forma e não dentro da função alterarTag devido a um erro no responsiveVoice que falava apenas o segundo texto mandado.

		responsiveVoice.speak('Acertou!' + texto, 'Brazilian Portuguese Female', {rate:1.2});
		document.getElementById('reiniciar').removeAttribute('disabled');
	}
	else {
		let msg = chute < numeroSecreto ? `O número é maior que ${chute}` : `O número é menor que ${chute}`
		alterarTag('p', msg);
		responsiveVoice.speak(msg, 'Brazilian Portuguese Female', {rate:1.2});
		limparOCampo();
	}
}

function limparOCampo () {
	let limpo = document.querySelector('input');
	limpo.value = '';
}

function reiniciarJogo() {
	numeroSecreto = gerarNumeroAleatorio();
	tentativas = 0;
	limparOCampo();
	mensagemInicial();
	document.getElementById('reiniciar').setAttribute('disabled', true);

}

function mensagemInicial() {
	alterarTag('h1', 'Jogo do número secreto!');
	alterarTag('p', `Escolha um número entre 1 e ${numeroMaximo}`);
	responsiveVoice.speak('Jogo do número secreto!' + `Escolha um número entre 1 e ${numeroMaximo}`, 'Brazilian Portuguese Female', {rate:1.2});
}

