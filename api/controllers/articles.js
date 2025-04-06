module.exports = {
    getAllArticles: (req, res) => {
        res.status(200).json({
            message: 'GET all articles'
        });
    },

    createArticle: (req, res) => {
        res.status(200).json({
            message: 'created article'
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