function enviarRespostaErro(res, status, mensagem) {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ erro: mensagem }));
}

function enviarRespostaSucesso(res, numeroPedido) {
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
        mensagem: 'Pedido criado com sucesso',
        numeroPedido: numeroPedido
    }));
}

module.exports = {
    enviarRespostaErro,
    enviarRespostaSucesso
};
