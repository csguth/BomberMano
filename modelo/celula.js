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
  this.personagem = null;
}

Celula.prototype.moverPersonagem = function(personagem, direcao)
{
  if(direcao == 'NENHUMA')
    return this;
  if(this.vizinhos[direcao] != null)
  {
    if(this.vizinhos[direcao].fixarPersonagem(personagem))
    {
      this.personagem = null;
      return this.vizinhos[direcao];
    }
  }
  return this;
}

Celula.prototype.fixarPersonagem = function(personagem)
{
  this.personagem = personagem;
  personagem.celula = this;
  return true;
}

module.exports = Celula;
