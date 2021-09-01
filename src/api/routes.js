const schema = require('./example/schema');

module.exports = async fastify => {
  const controller = require('./example/controller')(fastify);

  fastify.route({
    method: 'GET',
    url: '/',
    schema: schema.methodSchema,
    handler: controller.method
  });

  fastify.route({
    method: 'GET',
    url: '/products',
    schema: schema.methodCTSchema,
    handler: controller.methodCT
  });

  fastify.route({
    method: 'GET',
    url: '/customers',
    schema: schema.methodCTSchemaCustomer,
    handler: controller.methodCTCustomer
  });

  fastify.route({
    method: 'GET',
    url: '/carts',
    schema: schema.methodCTSchemaCart,
    handler: controller.methodCTCart
  });

  fastify.route({
    method: 'POST',
    url: '/create-product',
    schema: schema.methodCTSchemaCreateProduct,
    handler: controller.methodCTCreateProduct
  });

  fastify.route({
    method: 'POST',
    url: '/create-customer',
    schema: schema.methodCTSchemaCreateCustomer,
    handler: controller.methodCTCreateCustomer
  });

  fastify.route({
    method: 'POST',
    url: '/create-cart',
    schema: schema.methodCTSchemaCreateCart,
    handler: controller.methodCTCreateCart
  });
};
