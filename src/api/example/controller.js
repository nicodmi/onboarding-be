/* eslint-disable no-empty */
module.exports = fastify => {
  const service = require('./service')(fastify);

  //eslint-disable-next-line
  const { config, pubsub } = fastify;

  const method = async (request, reply) => {
    const { queryOne, queryTwo } = request.query;

    try {
      const message = { queryOne, queryTwo };
      await pubsub.publish('topicExample', message);
    } catch (error) {}

    reply.code(200).send({ queryOne, queryTwo });
  };

  const methodCT = async (request, reply) => {
    const { query } = request;

    const products = await service.getProducts(query);

    reply.code(200).send(products);
  };

  const methodCTCustomer = async (request, reply) => {
    const { query } = request;

    const customers = await service.getCustomers(query);

    reply.code(200).send(customers);
  };

  const methodCTCart = async (request, reply) => {
    const { query } = request;

    const carts = await service.getCarts(query);

    reply.code(200).send(carts);
  };

  const methodCTCreateProduct = async (request, reply) => {
    const { name, productType, slug } = request.body;

    const products = await service.createProducts({
      name,
      productType,
      slug
    });

    reply.code(200).send(products);
  };

  const methodCTCreateCustomer = async (request, reply) => {
    const { email, password } = request.body;

    const customer = await service.createCustomers({
      email,
      password
    });

    reply.code(200).send(customer);
  };

  const methodCTCreateCart = async (request, reply) => {
    const { currency, customerId } = request.body;

    const carts = await service.createCarts({
      currency,
      customerId
    });

    reply.code(200).send(carts);
  };

  return {
    method,
    methodCT,
    methodCTCustomer,
    methodCTCart,
    methodCTCreateProduct,
    methodCTCreateCart,
    methodCTCreateCustomer
  };
};
