var Entidade = require('./entidade');
var Tempo = require('./tempo')

Explosao.prototype = new Entidade();
Explosao.prototype.constructor = Explosao;

function Explosao(celula, tempo) {
	Entidade.call(this, celula);
	this.tempo = tempo;
	console.log("Criando explosao na posicao " + celula.linha + ", " + celula.coluna + " com tempo de " + tempo/Tempo.segundos(1) + " segundos.");
}

Explosao.prototype.atualizar = function() 
{
	this.tempo--;
	if(this.tempo == 0)
	{
		console.log("Parou de queimar em " + this.celula.linha + ", " + this.celula.coluna);
		this.celula.removerEntidade(this);
		this.viva = false;
	}
}


module.exports = Explosao;