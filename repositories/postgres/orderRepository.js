const OrderRepositoryInterface = require('../contratos/orderRepositoryInterface');
const pool = require('../../database/config');

class PostgresOrderRepository extends OrderRepositoryInterface {
    async inserirPedido(dadosPedido) {
        const cliente = await pool.connect();

        try {
            await cliente.query('BEGIN');

            const queryInserirPedido = `
        INSERT INTO "Order" ("orderId", value, "creationDate")
        VALUES ($1, $2, $3)
      `;

            await cliente.query(queryInserirPedido, [
                dadosPedido.numeroPedido,
                dadosPedido.valorTotal,
                dadosPedido.dataCriacao
            ]);

            await cliente.query('COMMIT');
            return {
                sucesso: true,
                numeroPedido: dadosPedido.numeroPedido
            };

        } catch (erro) {
            await cliente.query('ROLLBACK');
            throw erro;
        } finally {
            cliente.release();
        }
    }

    async inserirItems(numeroPedido, items) {
        const cliente = await pool.connect();

        try {
            await cliente.query('BEGIN');

            const queryInserirItems = `
        INSERT INTO "Items" ("orderId", "productId", quantity, price)
        VALUES ($1, $2, $3, $4)
      `;

            for (const item of items) {
                await cliente.query(queryInserirItems, [
                    numeroPedido,
                    item.idItem,
                    item.quantidadeItem,
                    item.valorItem
                ]);
            }

            await cliente.query('COMMIT');
            return { sucesso: true };

        } catch (erro) {
            await cliente.query('ROLLBACK');
            throw erro;
        } finally {
            cliente.release();
        }
    }
}

module.exports = PostgresOrderRepository;
