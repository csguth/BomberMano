var Celula  = require('./celula')
var EstadoDePersonagem = require('./estado-de-personagem')
var Personagem = function(nome)
{
  this.nome = nome;
  this.celula = null;
  this.estado = EstadoDePersonagem.PARADO;
  this.velocidade = 1;
}

Personagem.prototype.andar = function(direcao){
  this.celula = this.celula.moverPersonagem(this, direcao);
  return {linha: this.celula.linha, coluna: this.celula.coluna};
}

Personagem.prototype.tratarEntrada = function(comando)
{
	switch(this.estado)
	{
		case EstadoDePersonagem.PARADO:
			if(comando == 'cima' || comando == 'baixo' || comando == 'esquerda' || comando == 'direita')
				this.estado = EstadoDePersonagem.ANDANDO;
			else if(comando == 'bomba')
			{
				new Bomba(this.celula);
			}
		break;
		case EstadoDePersonagem.ANDANDO:
		break;
		case EstadoDePersonagem.MORTO:
		break;
	}
	console.log(this.nome + " apertei '" + comando + "'");
}

module.exports = Personagem;
