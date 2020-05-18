import express from 'express';
import routesConfig from './routes.config'

export default () => {
    const app = express();

    app.set('view engine', 'ejs');
    app.set('views', './src/views');

    app.use(express.json());

    app.use(express.static('./src/static'));

    routesConfig(app);

    return app;
};
