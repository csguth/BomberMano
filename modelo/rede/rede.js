var Rede = function(app)
{
  this.app = app;
  this._jogo = null;
}

Rede.prototype.init = function(jogo)
{
  this._jogo = jogo;
  var escopo = this;
  
  // NON-HTTP IO
  this.app.io.route('connect', function(req){
    console.log("Um jogador conectou!!");
  });

  this.app.io.route('entrarNoJogo', function(req){
    escopo._jogo.cadastrarPersonagem(req.data.credenciais.personagem);
  });

  this.app.io.route('mapa', function(req){
    console.log("recebeu 'mapa'");
    console.log(req.data);
    req.io.emit('dimensoes', {
      dimensoes: escopo._jogo._mapa._dimensoes,
      credenciais: req.data.credenciais
    });
    // BUSCAR AS POSICOES DE TODO MUNDO
  });

  this.app.io.route('andar', function(req){
    console.log("recebeu 'andar'");
    var resposta = {
      personagem: req.data.credenciais.personagem,
      posicao: escopo._jogo.andar(req.data.credenciais.personagem, req.data.direcao)
    };
    console.log(resposta);
    escopo.app.io.broadcast('posicao', resposta);
  });
}

module.exports = Rede;
