// Uma célula quadrada, com vizinhos em 4 direções (CIMA, BAIXO, ESQUERDA e DIREITA).

var Personagem = require('./personagem');
var Celula = function(linha, coluna)
{
  this.vizinhos = [];
  this.vizinhos['CIMA'] = null;
  this.vizinhos['BAIXO'] = null;
  this.vizinhos['ESQUERDA'] = null;
  this.vizinhos['DIREITA'] = null;
  this.linha = linha;
  this.coluna = coluna;
  this.entidades = [];
}

Celula.prototype = {
  adicionarEntidade: function(entidade) {
    this.entidades.push(entidade);
  },
  removerEntidade: function(entidade) {
  var indice = this.entidades.indexOf(entidade);
  if(indice > -1)
    this.entidades.splice(indice, 1);
  }
}

module.exports = Celula;
