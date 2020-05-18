import express from 'express';
import SwaggerDocs from 'swagger-jsdoc';
import SwaggerUI from 'swagger-ui-express';

const router = express.Router();

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Shopping List APP',
            description: 'shopping list REST API',
            contact: {
                name: 'Edney Roldao',
                phone: '11 96666-7777'
            },
            servers: [`${process.env.APP_HOST}:${process.env.PORT}`]
        }
    },
    apis: ['./src/routes/*.js']
};

const swaggerSpecs = SwaggerDocs(swaggerOptions);
router.use('/api-docs', SwaggerUI.serve);
router.get('/api-docs', SwaggerUI.setup(swaggerSpecs));

export default router;
