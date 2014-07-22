var Entidade = require('./entidade');
var Explosao = require('./explosao');
var Tempo = require('./tempo')

Bomba.prototype = new Entidade();
Bomba.prototype.constructor = Bomba;

function Bomba(celula, tempo, forca) {
	Entidade.call(this, celula);
	this.tempo = tempo;
	this.forca = forca;
	console.log("Criou uma bomba na posição " + celula.linha + ", " + celula.coluna + " com tempo " + tempo/Tempo.segundos(1) + " segundos e força " + forca);
}

Bomba.prototype.atualizar = function() 
{
	this.tempo--;
	if(this.tempo == 0)
	{
		console.log("A bomba da posição " + this.celula.linha + ", " + this.celula.coluna + " explodiu!");
		this.celula.removerEntidade(this);
		this.viva = false;
		var celula = this.celula;
		var explosao = new Explosao(this.celula, Tempo.segundos(1));
		celula.adicionarEntidade(explosao);	
		Entidade.vivas.push(explosao);
		for(direcao in celula.vizinhos)
		{
			var i = 0;
			var vizinho = celula.vizinhos[direcao];
			while(vizinho != null && i < this.forca)
			{
				var explosao = new Explosao(vizinho, Tempo.segundos(1));
				vizinho.adicionarEntidade(explosao);	
				Entidade.vivas.push(explosao);
				vizinho = vizinho.vizinhos[direcao];
				i++;
			}
		}
	}
}

module.exports = Bomba;