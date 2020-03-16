import CategoryModel from '../models/category.model';

export default () => {

    const categories = [
        {description: 'food'},
        {description: 'electronic'},
        {description: 'kids'},
        {description: 'clothes'},
        {description: 'games'},
        {description: 'sports'}
    ];

    categories.forEach(cat => {
        const category = new CategoryModel({
            description: cat.description
        });

        category
            .save()
            .then(r => {
                console.log('categories list has been persisted');
            })
            .catch(err => {
               console.log('where was an error while trying to persist categories list', err);
            });
    });

}