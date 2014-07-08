var Personagem = require('./personagem');
var Direcao = require('./direcao');
var Celula = function(linha, coluna)
{
  this.vizinhos = [null, null, null, null, null];
  this.linha = linha;
  this.coluna = coluna;
  this.personagem = null;
}

Celula.prototype.moverPersonagem = function(personagem, direcao)
{
  if(direcao == 'NENHUMA')
    return this;
  var vizinho = Direcao[direcao].valor;
  if(this.vizinhos[vizinho] != null)
  {
    if(this.vizinhos[vizinho].fixarPersonagem(Personagem))
    {
      this.personagem = null;
      return this.vizinhos[vizinho];
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
