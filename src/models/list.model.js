import mongoose from 'mongoose';

const shoppingListSchema =new mongoose.Schema({
    userId: {

    },
    categoryId: {

    },
    description: {

    },
    created: {

    },
    items: {

    }
});

export default mongoose.model('shoppingList', shoppingListSchema);