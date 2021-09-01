module.exports = fastify => {
  const {
    ProductProjectionRepository,
    ProductRepository,
    CustomerRepository,
    CartRepository
  } = fastify.commercetools.repositories;

  const service = {};

  service.getProducts = async query => {
    return ProductProjectionRepository.find(query);
  };

  service.getCustomers = async query => {
    return CustomerRepository.find(query);
  };

  service.getCarts = async query => {
    return CartRepository.find(query);
  };

  service.createProducts = async query => {
    return ProductRepository.create(query);
  };

  service.createCustomers = async query => {
    return CustomerRepository.create(query);
  };

  service.createCarts = async query => {
    return CartRepository.create(query);
  };

  return service;
};
