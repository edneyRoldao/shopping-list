import mongoose from 'mongoose';

const activationCodeSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    generated: {
        type: Date,
        default: Date.now
    },
    code: {
        type: String,
        required: true
    }
});

export default mongoose.model('activation-code', activationCodeSchema);
