import express from 'express';
import routesConfig from './routes.config'

export default () => {
    const app = express();

    app.use(express.json());

    routesConfig(app);

    return app;
};
