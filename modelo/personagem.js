var Celula  = require('./celula');
var Entidade = require('./entidade');
var EstadoDePersonagem = require('./estado-de-personagem');
var Tempo = require('./tempo')

Personagem.prototype = new Entidade();
Personagem.prototype.constructor = Personagem;

function Personagem(celula, nome)
{
	Entidade.call(this, celula);
  this.nome = nome;
  this.celula = celula;
  this.estado = EstadoDePersonagem.PARADO;
  this.contador = Tempo.segundos(0.3);
  this.tempoDeMovimento = Tempo.segundos(0.3);
  this.direcao = 'CIMA';
}

Personagem.prototype.tratarEntrada = function(comando)
{
	switch(this.estado)
	{
		case EstadoDePersonagem.PARADO:
			console.log("recebeu o comando " + comando);
			if(this.celula.vizinhos[comando] == null)
				break;
			this.estado = EstadoDePersonagem.ANDANDO;
			this.contador = this.tempoDeMovimento;
			this.direcao = comando;
		break;
		case EstadoDePersonagem.ANDANDO:
		break;
	}
}

Personagem.prototype.atualizar = function()
{
	switch(this.estado)
	{
		case EstadoDePersonagem.PARADO:
		break;
		case EstadoDePersonagem.ANDANDO:
			if(--this.contador == 0)
			{
				this.contador = this.tempoDeMovimento;
				this.estado = EstadoDePersonagem.PARADO;
				this.celula.vizinhos[this.direcao].adicionarEntidade(this);
				this.celula.removerEntidade(this);
				this.celula = this.celula.vizinhos[this.direcao];
				return true;
			}
		break;
	}
	return false;
}

module.exports = Personagem;
