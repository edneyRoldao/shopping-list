import authRoute from '../routes/auth.route';
import categoryRoute from '../routes/category.route';
import shoppingListRoute from '../routes/shoppingList.route';
import shoppingListItemRoute from '../routes/shoppingListItem.route';

export default (app) => {

    app.use('/api/auth', authRoute);
    app.use('/api/categories', categoryRoute);
    app.use('/api/shopping-list', shoppingListRoute);
    app.use('/api/shopping-list-item', shoppingListItemRoute);

    app.get('*', (req, res) => res.render('notFound'));
}
