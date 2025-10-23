import swaggerJsdoc from 'swagger-jsdoc';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Reconstruct __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define Swagger configuration
const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Formative-1 API',
      version: '1.0.0',
      description: 'Auto-generated API documentation for the backend routes'
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Local server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },

  // Use __dirname to avoid doubled directory paths
  apis: [
    path.join(__dirname, '../routes/*.js'),
    path.join(__dirname, '../routes/**/*.js'),
    path.join(__dirname, '../controllers/*.js'),
    path.join(__dirname, '../controllers/**/*.js')
  ]
};

// Debug: print the resolved API file globs
// try {
//   console.info('swagger-jsdoc: apis globs ->', options.apis);
// } catch (err) {
//   console.error('Error logging apis globs:', err);
// }

// Generate the spec
const swaggerSpec = swaggerJsdoc(options);

// Debug: list discovered paths
// try {
//   const pathKeys = swaggerSpec?.paths ? Object.keys(swaggerSpec.paths) : [];
//   console.info(`swagger-jsdoc: discovered ${pathKeys.length} paths`);
//   if (pathKeys.length > 0) console.info('paths:', pathKeys);
// } catch (err) {
//   console.error('Error while logging swagger spec:', err);
// }

// Add reusable schemas for Sequelize models
swaggerSpec.components = swaggerSpec.components || {};
swaggerSpec.components.schemas = {
  ...(swaggerSpec.components.schemas || {}),
  User: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      username: { type: 'string' },
      email: { type: 'string', format: 'email' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' }
    }
  },
  UserCreate: {
    type: 'object',
    required: ['firstName', 'lastName', 'username', 'email', 'password'],
    properties: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      username: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: { type: 'string' }
    }
  },
  Product: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'string', example: '30122025-electronics-janedoe-ghydbx' },
      name: { type: 'string' },
      description: { type: 'string' },
      category: { type: 'string', enum: ['Electronics', 'Books', 'Clothing', 'Home', 'Sports'] },
      price: { type: 'number', format: 'decimal' },
      seller: { type: 'string', format: 'uuid' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' }
    }
  },
  ProductCreate: {
    type: 'object',
    required: ['name', 'description', 'category', 'price'],
    properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        category: { type: 'string' },
        price: { type: 'number', format: 'decimal' },
    }
  },
  Inventory: {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      productId: { type: 'string', format: 'string', example: '30122025-books-janedoe-ghydbx' },
      quantity: { type: 'integer' },
      restockValue: { type: 'integer' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' }
    }
  },
  InventoryCreate: {
    type: 'object',
    required: ['productId'],
    properties: {
      productId: { type: 'string', format: 'string', example: '30122025-books-janedoe-ghydbx' },
      quantity: { type: 'integer' },
      restockValue: { type: 'integer' }
    }
  }
};

export default swaggerSpec;
