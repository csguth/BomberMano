function Entidade(celula)
{
	this.celula = celula;
	this.viva = true;
}

Entidade.vivas = [];

Entidade.tornarViva = function(entidade)
{
	Entidade.vivas.push(entidade);
}

module.exports = Entidade;