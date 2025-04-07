const Category = require('../models/category');
const mongoose = require('mongoose');

module.exports = {
    getAllCategories: (req, res) => {
        Category.find().then((categories)=>{
                    res.status(200).json({
                        categories
                    });
                }).catch(err => {
                    res.status(500).json({
                        err
                    });
                });
    },

    createCategories: (req, res) => {
        const {title, description} = req.body
        
                const category = new Category({
                    _id: new mongoose.Types.ObjectId(),
                    title,
                    description
                });
        
                category.save().then(result => {
                    res.status(200).json({
                        message: 'created category'
                    });
                }).catch(err => {
                    res.status(500).json({
                        err
                    });
                });
    },

    getCategories: (req, res) => {
            const categoryId = req.params.categoryId;
            Category.findById(categoryId).then((category) => {
                if (!category) {
                    return res.status(404).json({
                        message: 'Category not found'
                    });
                }
                res.status(200).json({
                    category
                });
            }).catch(err => {
                res.status(500).json({
                    err
                });
            });
    },

    updateCategories: (req, res) => {
        const categoryId = req.params.categoryId;

        Category.updateOne({_id: categoryId},req.body).then( ()=> {
            res.status(200).json({
                message: `catrgory updated`,
            });
        }).catch(err => {
            res.status(500).json({
                err
            });
        });
    },

    deleteCategories: (req, res) => {
        const categoryId = req.params.categoryId;

        Category.deleteOne({_id: categoryId}).then(() => {
            res.status(200).json({
                message: `deleted category - ${categoryId}`
            });
        }).catch(err => {
            res.status(500).json({
                err
            });
        });
    }
}