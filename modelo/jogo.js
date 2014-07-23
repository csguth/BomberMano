var Personagem = require('./personagem');
var Mapa = require('./mapa');
var Celula = require('./celula');
var Tempo = require('./tempo');
var Entidade = require('./entidade');

var Jogo = function(rede)
{
  this.relogio = 0;
  this._rede = rede;
  this._personagens = [];
  this._mapa = new Mapa(16);
}

Jogo.prototype.cadastrarPersonagem = function(personagem)
{
  var p = new Personagem(personagem);
  this._personagens[personagem] = p;
  this._mapa.fornecerCelula(3, 3).adicionarEntidade(p);
  p.celula = this._mapa.fornecerCelula(3, 3);
  Entidade.vivas.push(p);
  return true;
}

Jogo.prototype.posicoes = function() {
	var posicoes = [];
	for(personagem in this._personagens)
	{
		posicoes[this._personagens.nome] = {linha: this._personagem.celula.linha, coluna: this._personagem.celula.coluna};
	}
	return posicoes;
}

Jogo.prototype.tratarEntrada = function(personagem, comando)
{
  this._personagens[personagem].tratarEntrada(comando);
}

Jogo.prototype.atualizar = function()
{
  if(++this.relogio % Tempo.segundos(1) == 0) 
    console.log("+1 segundo");
  var numeroDeEntidades = Entidade.vivas.length;
  for(var i = 0; i < numeroDeEntidades; i++)
  {
    if(Entidade.vivas[i].viva)
    {
      if(Entidade.vivas[i].atualizar())
        this._rede.broadcast('entidade', {
          entidade: i,
          estado: Entidade.vivas[i].estado,
          contador: Entidade.vivas[i].contador,
          linha: Entidade.vivas[i].celula.linha,
          coluna: Entidade.vivas[i].celula.coluna
        });
    }
  }
}

module.exports = Jogo;
