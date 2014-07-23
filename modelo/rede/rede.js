var Entidade = require('../entidade');

var Rede = function(app)
{
  this.app = app;
  this._jogo = null;
}



Rede.prototype.init = function(jogo)
{
  this._jogo = jogo;
  var escopo = this;

  this.app.io.route('controle', function(req){
    var personagem = req.data.credenciais.personagem;
    var comando = req.data.comando;
    escopo._jogo.tratarEntrada(personagem, comando);
  });
  
  // NON-HTTP IO
  this.app.io.route('connect', function(req){
    console.log("Um jogador conectou!!");
  });

  this.app.io.route('entrarNoJogo', function(req){
    console.log("Cadastrnado o personagem: " + req.data.credenciais.personagem);
    escopo._jogo.cadastrarPersonagem(req.data.credenciais.personagem);
  });
}

Rede.prototype.broadcast = function(msg, conteudo)
{
  this.app.io.broadcast(msg, conteudo);
}

module.exports = Rede;
