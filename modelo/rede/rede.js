var Rede = function(socket)
{
  this._socket = socket;
  this._jogo = null;
}

Rede.prototype.init = function(jogo)
{
  this._jogo = jogo;
  var escopo = this;
  // NON-HTTP IO
  this._socket.route('connect', function(req){
    console.log("Um jogador conectou!!");
  });
  this._socket.route('entrarNoJogo', function(req){
    escopo._jogo.cadastrarPersonagem(req.data.credenciais.personagem);
  });
  this._socket.route('mapa', function(req){
    req.io.emit('dimensoes', escopo._jogo._mapa._dimensoes);
  });
  this._socket.route('andar', function(req){
    req.io.emit('andou', escopo._jogo.andar(req.data.credenciais.personagem, req.data.direcao));
  });
}

module.exports = Rede;
