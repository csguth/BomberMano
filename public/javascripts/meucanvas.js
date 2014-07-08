var MeuCanvas = function(elemento)
{
  this.elemento = elemento;
}
MeuCanvas.prototype.altura = function()
{
  return this.elemento.height();
}

MeuCanvas.prototype.largura = function()
{
  return this.elemento.width();
}

MeuCanvas.prototype.limpar = function()
{
  this.elemento.clearCanvas();
}

MeuCanvas.prototype.desenharCirculo = function(x, y, largura, altura)
{
  this.elemento.drawEllipse({
    fillStyle: "#f00",
    x: x,
    y: y,
    width: largura,
    height: altura
  });
}

MeuCanvas.prototype.desenharGrade = function(linhas, colunas)
{
  var largura = this.elemento.width();
  var altura = this.elemento.height();
  var larguraDaCelula = largura / colunas;
  var alturaDaCelula = altura / linhas;
  for(var i = 0; i < linhas; i++)
  {
    this.elemento.drawLine({
      strokeStyle: '#000',
      strokeWidth: 1,
      x1: i*larguraDaCelula, y1: 0,
      x2: i*larguraDaCelula, y2: altura
    });
  }
  for(var j = 0; j < colunas; j++)
  {
    this.elemento.drawLine({
      strokeStyle: '#000',
      strokeWidth: 1,
      x1: 0, y1: j*alturaDaCelula,
      x2: largura, y2: j*alturaDaCelula
    });
  }
}
