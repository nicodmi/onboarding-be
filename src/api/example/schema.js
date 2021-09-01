const {
  product: { product },
  customer: { customer },
  cart: { cart }
} = require('commercetools-entities-schemas');

const errorResponse = {
  type: 'object',
  properties: {
    errors: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description:
              'unique identifier for this particular occurrence of the problem'
          },
          code: {
            type: 'string',
            enum: ['001'],
            description: `> an internal specific error code:
             - 001: Request schema validation error
             
             `
          },
          status: {
            type: 'string',
            description: 'the HTTP status code applicable to this problem'
          },
          title: {
            type: 'string',
            description: 'a short, human-readable summary of the problem'
          },
          detail: {
            type: 'string',
            description: 'a human-readable explanation'
          },
          meta: {
            type: 'object',
            description:
              'a meta object containing non-standard meta-information',
            additionalProperties: true
          }
        },
        required: ['status']
      }
    }
  },
  required: ['errors']
};

const methodSchema = {
  title: 'Method example',
  description: 'Method example descriptions',
  querystring: {
    type: 'object',
    properties: {
      queryOne: { type: 'string' },
      queryTwo: { type: 'string' }
    },
    required: ['queryOne']
  },

  response: {
    200: {
      type: 'object',
      description: 'Method response example',
      properties: {
        queryOne: { type: 'string' },
        queryTwo: { type: 'string' }
      },
      required: ['queryOne']
    },
    '4xx': errorResponse,
    '5xx': errorResponse
  }
};

const methodCTSchema = {
  title: 'Method with ct request example',
  description: 'Method example descriptions',
  querystring: {
    type: 'object',
    properties: {
      name: { type: 'string' }
    }
  },

  response: {
    200: {
      type: 'object',
      description: 'Method response example',
      items: product,
      required: [],
      additionalProperties: true
    },
    '4xx': errorResponse,
    '5xx': errorResponse
  }
};

const methodCTSchemaCustomer = {
  title: 'Method with ct request example',
  description: 'Method example descriptions',
  querystring: {
    type: 'object',
    properties: {
      name: { type: 'string' }
    }
  },

  response: {
    200: {
      type: 'object',
      description: 'Method response example',
      items: customer,
      required: [],
      additionalProperties: true
    },
    '4xx': errorResponse,
    '5xx': errorResponse
  }
};

const methodCTSchemaCart = {
  title: 'Method with ct request example',
  description: 'Method example descriptions',
  querystring: {
    type: 'object',
    properties: {
      id: { type: 'string' }
    }
  },

  response: {
    200: {
      type: 'object',
      description: 'Method response example',
      items: cart,
      required: [],
      additionalProperties: true
    },
    '4xx': errorResponse,
    '5xx': errorResponse
  }
};

const methodCTSchemaCreateProduct = {
  title: 'Method with ct request example',
  description: 'Method example descriptions',
  querystring: {
    type: 'object',
    properties: {
      name: {
        en: { type: 'string' },
        de: { type: 'string' }
      },
      productType: {
        key: { type: 'string' }
      },
      slug: {
        en: { type: 'string' },
        de: { type: 'string' }
      }
    }
  },

  response: {
    200: {
      type: 'object',
      description: 'Method response example',
      items: product,
      required: [],
      additionalProperties: true
    },
    '4xx': errorResponse,
    '5xx': errorResponse
  }
};

const methodCTSchemaCreateCustomer = {
  title: 'Method with ct request example',
  description: 'Method example descriptions',
  querystring: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      password: { type: 'string' }
    }
  },

  response: {
    200: {
      type: 'object',
      description: 'Method response example',
      items: customer,
      required: [],
      additionalProperties: true
    },
    '4xx': errorResponse,
    '5xx': errorResponse
  }
};

const methodCTSchemaCreateCart = {
  title: 'Method with ct request example',
  description: 'Method example descriptions',
  querystring: {
    type: 'object',
    properties: {
      currency: { type: 'string' },
      customerId: { type: 'string' }
    }
  },

  response: {
    200: {
      type: 'object',
      description: 'Method response example',
      items: cart,
      required: [],
      additionalProperties: true
    },
    '4xx': errorResponse,
    '5xx': errorResponse
  }
};

module.exports = {
  methodSchema,
  methodCTSchema,
  methodCTSchemaCustomer,
  methodCTSchemaCart,
  methodCTSchemaCreateProduct,
  methodCTSchemaCreateCustomer,
  methodCTSchemaCreateCart
};
