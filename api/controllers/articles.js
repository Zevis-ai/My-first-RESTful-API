const Article = require('../models/article');
const mongoose = require('mongoose');
const Category = require('../models/category');

module.exports = {
    getAllArticles: (req, res) => {

        Article.find().populate('categoryId' , 'title').then((articles)=>{
            res.status(200).json({
                articles
            });
        }).catch(err => {
            res.status(500).json({
                err
            });
        });
    },

    createArticle: (req, res) => {
        const {title, description, content, categoryId} = req.body

        // Check if categoryId exists in the database
        Category.findById(categoryId).then(category => {
            if (!category) {
                return res.status(404).json({
                    message: 'Category not found'
                });
            }
            const article = new Article({
                _id: new mongoose.Types.ObjectId(),
                title,
                description,
                content,
                categoryId
            });
            return article.save();    
        }).then(result => {
            res.status(200).json({
                message: 'created article'
            });
        }).catch(err => {
            res.status(500).json({
                err
            });
        });
    },

    getArticle: (req, res) => {
        const articleId = req.params.articleId;
        Article.findById(articleId).then((article) => {
            if (!article) {
                return res.status(404).json({
                    message: 'Article not found'
                });
            }
            res.status(200).json({
                article
            });
        }).catch(err => {
            res.status(500).json({
                err
            });
        });
    },

    updateArticle: (req, res) => {
        const articleId = req.params.articleId;
        const { categoryId } = req.body

        if(categoryId){
            return Category.findById(categoryId).then(category => {
                if (!category) {
                    return res.status(404).json({
                        message: 'Category not found'
                    });
                }
                
                return Article.updateOne({_id: articleId}, req.body);
            }).then(result => {
                res.status(200).json({
                    message: 'article updated'
                });
            }).catch(err => {
                res.status(500).json({
                    err
                });
            });
        }

        Article.updateOne({_id: articleId},req.body).then( ()=> {
            res.status(200).json({
                message: `article updated`,
            });
        }).catch(err => {
            res.status(500).json({
                err
            });
        });
    },

    deleteArticle: (req, res) => {
        const articleId = req.params.articleId;

        Article.deleteOne({_id: articleId}).then(() => {
            res.status(200).json({
                message: `deleted article - ${articleId}`
            });
        }).catch(err => {
            res.status(500).json({
                err
            });
        });
    }
}