import express from 'express';
import routesConfig from './routes.config'

export default () => {
    const app = express();

    // passa o express para o config das rotas
    routesConfig(app);

    return app;
};
