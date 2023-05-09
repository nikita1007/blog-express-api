import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Blog API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default (app: Express) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};