var App;
var canvas;
var controle;
var credenciais = {personagem: 'jsilva'};
var loop = function()
{
  if(controle.cima)
  {
    console.log('Andando para cima...');
    App.socket.emit('andar', {'credenciais': credenciais, direcao: 'CIMA'});
  }
  if(controle.baixo)
  {
    console.log('Andando para baixo...'); 
    App.socket.emit('andar', {'credenciais': credenciais, direcao: 'BAIXO'});
  }
  if(controle.esquerda)
  {
    console.log('Andando para esquerda...');
    App.socket.emit('andar', {'credenciais': credenciais, direcao: 'ESQUERDA'});
  }
  if(controle.direita)
  {
    console.log('Andando para direita...');
    App.socket.emit('andar', {'credenciais': credenciais, direcao: 'DIREITA'});
  }
}

$(function(){
  canvas = new MeuCanvas($("canvas"));
  controle = new ControleSimples();
  App = {};
  App.socket = io.connect();
  App.socket.on('connect', function(){
    App.socket.emit('mapa', {'credenciais': credenciais});
    App.socket.emit('entrarNoJogo', {'credenciais': credenciais});
    App.socket.emit('andar', {'credenciais': credenciais, 'direcao': 'NENHUMA'});
  });
  var linhas = 4; // APENAS UM VALOR DEFAULT
  var colunas = 4; // APENAS UM VALOR DEFAULT
  App.socket.on('dimensoes', function(dados){
    linhas = dados.linhas;
    colunas = dados.colunas;
    canvas.desenharGrade(linhas, colunas);
    console.log("Servidor enviou as dimensões do mapa: " + linhas + "x" + colunas);
  });
  App.socket.on('andou', function(dados){
    var larguraDaCelula = canvas.largura() / linhas;
    var alturaDaCelula = canvas.altura() / colunas;
    canvas.limpar();
    canvas.desenharGrade(linhas, colunas);
    canvas.desenharCirculo(dados.coluna*larguraDaCelula+larguraDaCelula/2, dados.linha*alturaDaCelula+alturaDaCelula/2, 10, 10);
  });

  setInterval(loop, 100); // LOOP FAZ UM POLLING NO TECLADO NUMA FREQUÊNCIA DE 10Hz
});
