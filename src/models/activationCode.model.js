import mongoose from 'mongoose';
import codeGenerator from '../utils/codeGenerator.util';

const categorySchema =new mongoose.Schema({
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
        default: codeGenerator()
    }
});

export default mongoose.model('activation-code', categorySchema);
