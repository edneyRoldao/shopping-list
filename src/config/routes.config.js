import authRoute from '../routes/auth.route';
import swaggerRoute from '../config/swagger.config';
import itemListRoute from '../routes/itemList.route';
import categoryRoute from '../routes/category.route';
import shoppingListRoute from '../routes/shoppingList.route';

export default (app) => {

    app.use('', swaggerRoute);
    app.use('/api/auth', authRoute);
    app.use('/api/item-list', itemListRoute);
    app.use('/api/categories', categoryRoute);
    app.use('/api/shopping-list', shoppingListRoute);

    app.get('*', (req, res) => res.render('notFound', {appName: 'SHOPPING LIST API'}));

}
