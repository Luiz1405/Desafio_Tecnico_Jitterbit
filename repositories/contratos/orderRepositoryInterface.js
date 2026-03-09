class OrderRepositoryInterface {
  async inserirPedido(dadosPedido) {
    throw new Error('Método inserirPedido deve ser implementado');
  }

  async inserirItems(numeroPedido, items) {
    throw new Error('Método inserirItems deve ser implementado');
  }
}

module.exports = OrderRepositoryInterface;
