const { criarPedidoController, buscarPedidoController, listarPedidosController } = require('../controllers/orderController');
const { extrairNumeroPedidoDaUrl, isRotaGetPedido, isRotaPostPedido, isRotaListarPedidos } = require('../utils/urlParser');
const { enviarRespostaErro } = require('../utils/responseHandler');

function tratarRotaPedido(req, res) {
    if (req.method === 'POST' && isRotaPostPedido(req.url)) {
        criarPedidoController(req, res);
        return;
    }

    if (req.method === 'GET' && isRotaListarPedidos(req.url)) {
        listarPedidosController(req, res);
        return;
    }

    if (req.method === 'GET' && isRotaGetPedido(req.url)) {
        const numeroPedido = extrairNumeroPedidoDaUrl(req.url);

        if (!numeroPedido) {
            enviarRespostaErro(res, 400, 'Número do pedido não fornecido na URL');
            return;
        }

        buscarPedidoController(req, res, numeroPedido);
        return;
    }

    enviarRespostaErro(res, 404, 'Rota não encontrada');
}

module.exports = tratarRotaPedido;
