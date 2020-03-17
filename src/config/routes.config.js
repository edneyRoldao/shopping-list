import authRoute from '../routes/auth.route';
import categoryRoute from '../routes/category.route';
import shoppingListRoute from '../routes/shoppingList.route';
import shoppingListItemRoute from '../routes/shoppingListItem.route';

// app e a instancia do express da aplicacao
export default (app) => {

    app.use('/auth', authRoute);
    app.use('/api/categories', categoryRoute);
    app.use('/api/shopping-list', shoppingListRoute);
    app.use('/api/shopping-list', shoppingListItemRoute);

}