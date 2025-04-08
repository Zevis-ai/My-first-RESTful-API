const Category = require('../models/category');
const mongoose = require('mongoose');

module.exports = {
    getAllCategories: (req, res) => {
        Category.find()
            .then(categories => {
                res.status(200).json({ categories });
            })
            .catch(err => {
                res.status(500).json({ err });
            });
    },

    createCategories: (req, res) => {
        const { title, description } = req.body;

        const category = new Category({
            _id: new mongoose.Types.ObjectId(),
            title,
            description
        });

        category.save()
            .then(result => {
                res.status(200).json({
                    message: 'Created category'
                });
            })
            .catch(err => {
                res.status(500).json({ err });
            });
    },

    getCategories: (req, res) => {
        const categoryId = req.params.categoryId;
        Category.findById(categoryId)
            .then(category => {
                if (!category) {
                    return res.status(404).json({
                        message: 'Category not found'
                    });
                }
                res.status(200).json({ category });
            })
            .catch(err => {
                res.status(500).json({ err });
            });
    },

    updateCategories: async (req, res) => {
        try {
            const categoryId = req.params.categoryId;
            const category = await Category.findById(categoryId);

            if (!category) {
                return res.status(404).json({
                    message: 'Category not found'
                });
            }

            await Category.updateOne({ _id: categoryId }, req.body);
            return res.status(200).json({
                message: 'Category updated'
            });
        } catch (err) {
            return res.status(500).json({ err });
        }
    },

    deleteCategories: async (req, res) => {
        try {
            const categoryId = req.params.categoryId;
            const category = await Category.findById(categoryId);

            if (!category) {
                return res.status(404).json({
                    message: 'Category not found'
                });
            }

            await Category.deleteOne({ _id: categoryId });
            return res.status(200).json({
                message: `Deleted category - ${categoryId}`
            });
        } catch (err) {
            return res.status(500).json({ err });
        }
    }
}
