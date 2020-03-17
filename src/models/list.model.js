import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const shoppingListSchema = Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    description: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('shoppingList', shoppingListSchema);