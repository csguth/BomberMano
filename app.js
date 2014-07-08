var express = require('express.io');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var test = require('./routes/test');
var Personagem = require('./modelo/personagem');
var Mapa = require('./modelo/mapa');

var app = express().http().io();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/test', test);


var personagem = new Personagem('jsilva');
var tamanho = 30;
var mapa = new Mapa(tamanho);
mapa.fornecerCelula(0, 0).fixarPersonagem(personagem);

console.log("Iniciou o servidor, aguardando conexões...");

// NON-HTTP IO
app.io.route('connect', function(req){
  console.log("Conectou!!");
});
app.io.route('mapa', function(req){
  console.log("Usuário pediu as dimensões do mapa");
  req.io.emit('dimensoes', {linhas: tamanho, colunas: tamanho});
});
app.io.route('andar', function(req){
  console.log("Andou!!");
  personagem.andar(req.data.direcao);
  req.io.emit('andou', {
    linha: personagem.celula.linha,
    coluna: personagem.celula.coluna
  });
});

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
