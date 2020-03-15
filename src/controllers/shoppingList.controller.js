export default class ShoppingListController {

    list(req, res) {
        const list = [
            {id: 1, description: 'laptop'},
            {id: 2, description: 'iphone'},
            {id: 3, description: 'galaxy'},
            {id: 4, description: 'vaio'}
        ];

        return res.status(200).json(list);
    }

}