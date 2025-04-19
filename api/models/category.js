import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: { type: String, required: true },
    description: { type: String, required: true }
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
