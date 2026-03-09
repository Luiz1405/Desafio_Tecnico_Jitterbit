const PostgresOrderRepository = require('./postgres/orderRepository');

const tipoBanco = process.env.DB_TYPE || 'postgres';

let orderRepository;

switch (tipoBanco) {
    case 'postgres':
        orderRepository = new PostgresOrderRepository();
        break;
    default:
        throw new Error(`Tipo de banco de dados não suportado: ${tipoBanco}`);
}

module.exports = orderRepository;
