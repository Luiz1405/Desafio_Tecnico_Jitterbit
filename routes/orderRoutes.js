const { criarPedidoController, buscarPedidoController, listarPedidosController, atualizarPedidoController, deletarPedidoController } = require('../controllers/orderController');
const { extrairNumeroPedidoDaUrl, isRotaGetPedido, isRotaPostPedido, isRotaListarPedidos, isRotaPutPedido, isRotaPatchPedido, isRotaDeletePedido } = require('../utils/urlParser');
const { enviarRespostaErro } = require('../utils/responseHandler');
const { autenticar } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: Listar todos os pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   numeroPedido:
 *                     type: string
 *                   valorTotal:
 *                     type: number
 *                   dataCriacao:
 *                     type: string
 *                   items:
 *                     type: array
 *                     items:
 *                       type: object
 */
function tratarRotaPedido(req, res) {
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

    if (req.method === 'POST' && isRotaPostPedido(req.url)) {
        autenticar(req, res, () => {
            criarPedidoController(req, res);
        });
        return;
    }

    if ((req.method === 'PUT' || req.method === 'PATCH') && (isRotaPutPedido(req.url) || isRotaPatchPedido(req.url))) {
        const numeroPedido = extrairNumeroPedidoDaUrl(req.url);

        if (!numeroPedido) {
            enviarRespostaErro(res, 400, 'Número do pedido não fornecido na URL');
            return;
        }

        autenticar(req, res, () => {
            atualizarPedidoController(req, res, numeroPedido);
        });
        return;
    }

    if (req.method === 'DELETE' && isRotaDeletePedido(req.url)) {
        const numeroPedido = extrairNumeroPedidoDaUrl(req.url);

        if (!numeroPedido) {
            enviarRespostaErro(res, 400, 'Número do pedido não fornecido na URL');
            return;
        }

        autenticar(req, res, () => {
            deletarPedidoController(req, res, numeroPedido);
        });
        return;
    }

    enviarRespostaErro(res, 404, 'Rota não encontrada');
}

/**
 * @swagger
 * /order/{numeroPedido}:
 *   get:
 *     summary: Buscar pedido por número
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: numeroPedido
 *         required: true
 *         schema:
 *           type: string
 *         example: v10089016vdb-01
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 *   put:
 *     summary: Atualizar pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: numeroPedido
 *         required: true
 *         schema:
 *           type: string
 *         example: v10089016vdb-01
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valorTotal:
 *                 type: number
 *                 example: 15000
 *               dataCriacao:
 *                 type: string
 *                 example: "2023-07-20T10:00:00.000Z"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     idItem:
 *                       type: string
 *                     quantidadeItem:
 *                       type: integer
 *                     valorItem:
 *                       type: number
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Pedido não encontrado
 *   patch:
 *     summary: Atualizar pedido (parcial)
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: numeroPedido
 *         required: true
 *         schema:
 *           type: string
 *         example: v10089016vdb-01
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valorTotal:
 *                 type: number
 *               dataCriacao:
 *                 type: string
 *               items:
 *                 type: array
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Pedido não encontrado
 *   delete:
 *     summary: Deletar pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: numeroPedido
 *         required: true
 *         schema:
 *           type: string
 *         example: v10089016vdb-01
 *     responses:
 *       200:
 *         description: Pedido deletado com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Pedido não encontrado
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Criar novo pedido
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numeroPedido
 *               - valorTotal
 *               - dataCriacao
 *               - items
 *             properties:
 *               numeroPedido:
 *                 type: string
 *                 example: v10089015vdb-01
 *               valorTotal:
 *                 type: number
 *                 example: 10000
 *               dataCriacao:
 *                 type: string
 *                 example: "2023-07-19T12:24:11.5299601+00:00"
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - idItem
 *                     - quantidadeItem
 *                     - valorItem
 *                   properties:
 *                     idItem:
 *                       type: string
 *                       example: "2434"
 *                     quantidadeItem:
 *                       type: integer
 *                       example: 1
 *                     valorItem:
 *                       type: number
 *                       example: 1000
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Erro de validação
 *       401:
 *         description: Não autenticado
 */
module.exports = tratarRotaPedido;
