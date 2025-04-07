const Article = require('../models/article');
const mongoose = require('mongoose');

module.exports = {
    getAllArticles: (req, res) => {
        Article.find().then((articles)=>{
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
        const {title, description, content} = req.body

        const article = new Article({
            _id: new mongoose.Types.ObjectId(),
            title,
            description,
            content
        });

        article.save().then(result => {
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
        res.status(200).json({
            message: `updated article - ${articleId}`
        });
    },

    deleteArticle: (req, res) => {
        const articleId = req.params.articleId;
        res.status(200).json({
            message: `deleted article - ${articleId}`
        });
    }
}