import mongoose from 'mongoose';

const categorySchema =new mongoose.Schema({
    description: {
        type: String,
        required: true,
        min: 6,
        max: 100
    },
});

export default mongoose.model('category', categorySchema);