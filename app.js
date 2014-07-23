var express = require('express.io');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var test = require('./routes/test');
var Jogo = require('./modelo/jogo');
var Rede = require('./modelo/rede/rede');
var CaixaDeAreia = require('./modelo/caixa-de-areia');
var Tempo = require('./modelo/tempo')

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


var rede = new Rede(app);
var jogo = new Jogo(rede);
rede.init(jogo);
setInterval(function(){
    jogo.atualizar();
}, Tempo.periodoDeAtualizacao);

// var caixaDeAreia = new CaixaDeAreia();
// caixaDeAreia.inicializar();
// setInterval(function(){
//     caixaDeAreia.atualizar();
// }, Tempo.periodoDeAtualizacao);

// console.log("Iniciou o servidor, aguardando conexões...");

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
