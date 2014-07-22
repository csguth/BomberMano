var Tempo = {
	periodoDeAtualizacao: 10 // a cada 'periodoDeAtualizacao' ms, o loop de atualização é executado
};

Tempo.segundos = function(segundos)
{
	return (1000/Tempo.periodoDeAtualizacao) * segundos;
}

module.exports = Tempo;