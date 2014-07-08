var Celula = require('./celula');
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
    if(linha != tamanho - 1)
      this.mapa[i].vizinhos['BAIXO'] = this.mapa[i + tamanho];
    if(linha != 0)
      this.mapa[i].vizinhos['CIMA'] = this.mapa[i - tamanho];
    if(coluna != 0)
      this.mapa[i].vizinhos['ESQUERDA'] = this.mapa[i - 1];
    if(coluna != tamanho - 1)
      this.mapa[i].vizinhos['DIREITA'] = this.mapa[i + 1];
  }
}

Mapa.prototype.fornecerCelula = function(linha, coluna)
{
  return this.mapa[linha * this.tamanho + coluna];
}


module.exports = Mapa;
