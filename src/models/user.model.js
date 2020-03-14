import mongoose from 'mongoose';

const userSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },
    created: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('user', userSchema);