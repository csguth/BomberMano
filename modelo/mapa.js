var Celula = require('./celula');
var Mapa = function(tamanho)
{
  this._tamanho = tamanho;
  this._mapa  = new Array(tamanho * tamanho);
  this._dimensoes = {linhas: tamanho, colunas: tamanho};
  for(var i = 0; i < tamanho * tamanho; i++)
  {
    this._mapa[i] = new Celula(Math.floor(i / tamanho), i % tamanho);
  }
  for(var i = 0; i < tamanho*tamanho; i++)
  {
    var linha = Math.floor(i/tamanho);
    var coluna = i % tamanho;
    if(linha != tamanho - 1)
      this._mapa[i].vizinhos['BAIXO'] = this._mapa[i + tamanho];
    if(linha != 0)
      this._mapa[i].vizinhos['CIMA'] = this._mapa[i - tamanho];
    if(coluna != 0)
      this._mapa[i].vizinhos['ESQUERDA'] = this._mapa[i - 1];
    if(coluna != tamanho - 1)
      this._mapa[i].vizinhos['DIREITA'] = this._mapa[i + 1];
  }
}

Mapa.prototype.fornecerCelula = function(linha, coluna)
{
  return this._mapa[linha * this._tamanho + coluna];
}


module.exports = Mapa;
