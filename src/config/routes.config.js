import authRoute from '../routes/auth.route';
import categoryRoute from '../routes/category.route';
import shoppingListRoute from '../routes/shoppingList.route';
import shoppingListItemRoute from '../routes/shoppingListItem.route';

export default (app) => {

    app.use('/auth', authRoute);
    app.use('/categories', categoryRoute);
    app.use('/shopping-list', shoppingListRoute);
    app.use('/shopping-list', shoppingListItemRoute);

}
