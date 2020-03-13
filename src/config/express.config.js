import express from 'express';

export default () => {
    const app = express();

    // here comes all config that express needs (middleware, routes and stuff)
    app.get('/teste', (req, res) => {
        res.json('all is working');
    });

    return app;
};
