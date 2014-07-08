var Celula  = require('./celula')
var Personagem = function(nome)
{
  this.nome = nome;
  this.celula = null;
}

Personagem.prototype.andar = function(direcao){
  this.celula = this.celula.moverPersonagem(this, direcao);
}

module.exports = Personagem;
