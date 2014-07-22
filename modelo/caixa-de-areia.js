var Bomba = require('./bomba');
var Celula = require('./celula');
var Entidade = require('./entidade');
var Tempo = require('./tempo');
var Mapa = require('./mapa');

function CaixaDeAreia()
{
	this.relogio = 0;
}

CaixaDeAreia.prototype.inicializar = function() {
	var mapa = new Mapa(16);
	var celula1 = mapa.fornecerCelula(0, 3);
	var celula2 = mapa.fornecerCelula(7, 4);
	var b1 = Entidade.tornarViva(new Bomba(celula1, Tempo.segundos(3), 2));
	var b2 = Entidade.tornarViva(new Bomba(celula2, Tempo.segundos(3), 16));
	celula1.adicionarEntidade(b1);
	celula2.adicionarEntidade(b2);
};

CaixaDeAreia.prototype.atualizar = function()
{
	if(++this.relogio % Tempo.segundos(1) == 0) 
		console.log("+1 segundo");
	var numeroDeEntidades = Entidade.vivas.length;
	for(var i = 0; i < numeroDeEntidades; i++)
	{
		if(Entidade.vivas[i].viva)
			Entidade.vivas[i].atualizar();
	}
	// for(var i = 0; i < numeroDeEntidades; i++)
	// {
	// 	if(!Entidade.vivas[i].viva)
	// 		Entidade.vivas.splice(i, 1);
	// }
}



module.exports = CaixaDeAreia;