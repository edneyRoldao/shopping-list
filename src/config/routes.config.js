import authRoute from '../routes/auth.route';
import categoryRoute from '../routes/category.route';
import shoppingListRoute from '../routes/shoppingList.route';

// app e a instancia do express da aplicacao
export default (app) => {

    app.use('/auth', authRoute);
    app.use('/categories', categoryRoute);
    app.use('/shopping', shoppingListRoute);

}