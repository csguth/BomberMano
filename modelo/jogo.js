var Personagem = require('./personagem');
var Mapa = require('./mapa');
var Celula = require('./celula');

var Jogo = function(rede)
{
  this._rede = rede;
  this._personagens = [];
  this._mapa = new Mapa(16);
}

Jogo.prototype.cadastrarPersonagem = function(personagem)
{
  this._personagens[personagem] = new Personagem(personagem);
  this._mapa.fornecerCelula(0, 0).fixarPersonagem(this._personagens[personagem]);
  return true;
}

Jogo.prototype.andar = function(personagem, direcao)
{
  return this._personagens[personagem].andar(direcao);
}

module.exports = Jogo;
