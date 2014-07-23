var jogo;
var mapa;
var chao;
var parede;
var quebraveis;
$(function(){
  jogo = new Phaser.Game(544, 544, Phaser.AUTO, '', { preload: preCarregar, create: criar, update: atualizar });

  function preCarregar () {
     jogo.load.image('logo', '/assets/pics/phaser.png');
     jogo.load.image('bman', '/assets/pics/bman.png');
     jogo.load.tilemap('mapa', '/assets/mapas/mapa1/mapa1.json', null, Phaser.Tilemap.TILED_JSON);
     jogo.load.image('grass-tiles-2-small', '/assets/mapas/mapa1/grass-tiles-2-small.png');
     jogo.load.image('littleshrooms_0', '/assets/mapas/mapa1/littleshrooms_0.png');
  }

  function criar () {
    mapa = jogo.add.tilemap('mapa');
    mapa.addTilesetImage('grass-tiles-2-small');
    mapa.addTilesetImage('littleshrooms_0');
    chao = mapa.createLayer('chao');
    parede = mapa.createLayer('parede');
    quebraveis = mapa.createLayer('blocos quebraveis');
    chao.resizeWorld();
  }

  function atualizar() {
  }

});