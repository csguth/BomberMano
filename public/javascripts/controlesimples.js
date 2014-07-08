var ControleSimples = function(){
  this.cima = false;
  this.baixo = false;
  this.esquerda = false;
  this.direita = false;
  var escopo = this;
  $('body').keydown(function(evento){
    switch(evento.key)
    {
      case 'Up':
        escopo.cima = true;
      break;
      case 'Down':
        escopo.baixo = true;
      break;
      case 'Left':
        escopo.esquerda = true;
      break;
      case 'Right':
        escopo.direita = true;
      break;
    }
  });
  $('body').keyup(function(evento){
    switch(evento.key)
    {
      case 'Up':
        escopo.cima = false;
      break;
      case 'Down':
        escopo.baixo = false;
      break;
      case 'Left':
        escopo.esquerda = false;
      break;
      case 'Right':
        escopo.direita = false;
      break;
    }
  });

}

ControleSimples.prototype.paraTexto = function()
{
  var saida = '';
  saida += 'Cima: ' + (this.cima ? "SIM" : "NÃO");
  saida += '\nBaixo: ' + (this.baixo ? "SIM" : "NÃO");
  saida += '\nEsquerda: ' + (this.esquerda ? "SIM" : "NÃO");
  saida += '\nDireita: ' + (this.direita ? "SIM" : "NÃO");
  return saida;
}
