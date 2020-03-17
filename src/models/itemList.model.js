import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const itemListSchema = new Schema({
    amount: {
        type: Number,
        default: 1
    },
    description: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    purchased: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 0.0
    },
    url: {
        type: String,
        required: false,
        min: 3,
        max: 4000
    },
    listId: {
        type: Schema.Types.ObjectId,
        ref: 'shoppingList'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('shoppingListItem', itemListSchema);