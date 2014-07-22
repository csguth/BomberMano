var App;
var jogo;
var direcional;
var credenciais = {personagem: 'csguth'};

$(function(){
  App = {};
  App.socket = io.connect();
  App.socket.on('connect', function(){
    App.socket.emit('entrarNoJogo', {credenciais: credenciais});
    jogo = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preCarregar, create: criar, update: atualizar });
  });

  function preCarregar () {
      jogo.load.image('logo', '/assets/pics/phaser.png');
  }

  function criar () {
      direcional = jogo.input.keyboard.createCursorKeys();
      var logo = jogo.add.sprite(jogo.world.centerX, jogo.world.centerY, 'logo');
      logo.anchor.setTo(0.5, 0.5);

  }

  function atualizar() {
      if(direcional.left.isDown)
        App.socket.emit('controle', {credenciais: credenciais, comando: 'esquerda'});
      else if(direcional.right.isDown)
        App.socket.emit('controle', {credenciais: credenciais, comando: 'direita'});
      else if(direcional.up.isDown)
        App.socket.emit('controle', {credenciais: credenciais, comando: 'cima'});
      else if(direcional.down.isDown)
        App.socket.emit('controle', {credenciais: credenciais, comando: 'baixo'});
  }

});