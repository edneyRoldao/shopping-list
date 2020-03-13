import authRoute from '../routes/auth.route';

// app e a instancia do express da aplicacao
export default (app) => {

    app.use('/auth', authRoute);

}