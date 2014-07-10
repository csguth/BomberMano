var Celula  = require('./celula')
var Personagem = function(nome)
{
  this.nome = nome;
  this.celula = null;
}

Personagem.prototype.andar = function(direcao){
  this.celula = this.celula.moverPersonagem(this, direcao);
  return {linha: this.celula.linha, coluna: this.celula.coluna};
}

module.exports = Personagem;
