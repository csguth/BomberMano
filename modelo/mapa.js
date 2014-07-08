var Celula = require('./celula');
var Direcao = require('./direcao');
var Mapa = function(tamanho)
{
  this.tamanho = tamanho;
  this.mapa  = new Array(tamanho * tamanho);
  for(var i = 0; i < tamanho * tamanho; i++)
  {
    this.mapa[i] = new Celula(Math.floor(i / tamanho), i % tamanho);
  }
  for(var i = 0; i < tamanho*tamanho; i++)
  {
    var linha = Math.floor(i/tamanho);
    var coluna = i % tamanho;
    if(linha == 0)
    {
      this.mapa[i].vizinhos[Direcao.CIMA.valor] = null;
      this.mapa[i].vizinhos[Direcao.BAIXO.valor] = this.mapa[i + tamanho];
    } else if(linha == tamanho - 1)
    {
      this.mapa[i].vizinhos[Direcao.CIMA.valor] = this.mapa[i - tamanho];
      this.mapa[i].vizinhos[Direcao.BAIXO.valor] = null;
    }
    else {
      this.mapa[i].vizinhos[Direcao.CIMA.valor] = this.mapa[i - tamanho];
      this.mapa[i].vizinhos[Direcao.BAIXO.valor] = this.mapa[i + tamanho];
    }
    if(coluna == 0)
    {
      this.mapa[i].vizinhos[Direcao.ESQUERDA.valor] = null;
      this.mapa[i].vizinhos[Direcao.DIREITA.valor] = this.mapa[i + 1];
    } else if(coluna == tamanho - 1)
    {
      this.mapa[i].vizinhos[Direcao.ESQUERDA.valor] = this.mapa[i-1];
      this.mapa[i].vizinhos[Direcao.DIREITA.valor] = null;
    } else
    {
      this.mapa[i].vizinhos[Direcao.ESQUERDA.valor] = this.mapa[i-1];
      this.mapa[i].vizinhos[Direcao.DIREITA.valor] = this.mapa[i+1];
    }
  }
}

Mapa.prototype.fornecerCelula = function(linha, coluna)
{
  return this.mapa[linha * this.tamanho + coluna];
}


module.exports = Mapa;
