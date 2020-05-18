import mongoose from 'mongoose';

const refreshTokenSchema =new mongoose.Schema({
    refreshToken: {
        type: String,
        required: true
    }
});

export default mongoose.model('refresh-token', refreshTokenSchema);