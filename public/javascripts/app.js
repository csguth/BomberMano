var App;
var canvas;
var controle;
var credenciais;
var posicoes = {};
var larguraDaCelula;
var alturaDaCelula;
 
var linhas = 4; // APENAS UM VALOR DEFAULT
var colunas = 4; // APENAS UM VALOR DEFAULT
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
  console.log("iniciou o cliente!");
  canvas = new MeuCanvas($("canvas"));
  controle = new ControleSimples();
  credenciais = {personagem: $('#entrada-personagem').val()};
  $('#entrada-conectar').attr('disabled', 'disabled');
  $('#entrada-conectar').text('Aguardando conexão com o servidor...');
  App = {};
  App.socket = io.connect();
  App.socket.on('connect', function(){
    console.log("Conectou com o servidor!!");
    $('#entrada-conectar').removeAttr('disabled');
    $('#entrada-conectar').text('Conectar');
    $('#entrada-conectar').click(function(e)
      {
        console.log("Clicou!!");
        e.preventDefault();
        credenciais.personagem = $('#entrada-personagem').val();
        $('#entrada-conectar').attr('disabled', 'disabled');
        $('#entrada-personagem').attr('disabled', 'disabled');
        $('#entrada-conectar').removeClass('btn-info');
        $('#entrada-conectar').addClass('btn-success');
        $('#entrada-conectar').text('Conectou');       
        App.socket.emit('mapa', {'credenciais': credenciais});
        App.socket.emit('entrarNoJogo', {'credenciais': credenciais});
        App.socket.emit('andar', {'credenciais': credenciais, 'direcao': 'NENHUMA'});
      }
    );
    App.socket.on('dimensoes', function(dados)
      {
        console.log("recebeu 'dimensoes'");
        console.log(dados);
        if(dados.credenciais.personagem == credenciais.personagem)
        {
          console.log("Recebeu as dimensões do mapa!!");
          linhas = dados.dimensoes.linhas;
          colunas = dados.dimensoes.colunas;
          larguraDaCelula = canvas.largura() / linhas;
          alturaDaCelula = canvas.altura() / colunas;
          canvas.desenharGrade(linhas, colunas);
          console.log("Servidor enviou as dimensões do mapa: " + linhas + "x" + colunas);  
        }
      }
    );
    App.socket.on('posicao', function(dados)
      {
        console.log("recebeu 'posicao'");
        console.log(dados);
        posicoes[dados.personagem] = dados.posicao;
        console.log(posicoes);
      }
    );
  });

  setInterval(loop, 200); // LOOP FAZ UM POLLING NO TECLADO NUMA FREQUÊNCIA DE 10Hz
  setInterval(atualizarCanvas, 33);
});

var atualizarCanvas = function()
{
  // console.log("Tem " + posicoes.length + " usuarios");
  canvas.limpar();
  canvas.desenharGrade(linhas, colunas);
  for(i in posicoes)
  {
    var posicao = posicoes[i];    
    canvas.desenharCirculo(posicao.coluna*larguraDaCelula+larguraDaCelula/2, posicao.linha*alturaDaCelula+alturaDaCelula/2, 10, 10);
  }
}