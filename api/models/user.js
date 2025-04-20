import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String},
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
    },
    password: { type: String, required: true }
});

export default mongoose.model('User', userSchema);
