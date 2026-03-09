const { criarPedidoController } = require('../controllers/orderController');

function tratarRotaPedido(req, res) {
    if (req.method === 'POST' && req.url === '/order') {
        criarPedidoController(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ erro: 'Rota não encontrada' }));
    }
}

module.exports = tratarRotaPedido;
