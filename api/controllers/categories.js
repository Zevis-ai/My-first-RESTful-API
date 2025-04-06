module.exports = {
    getAllCategories: (req, res) => {
        res.status(200).json({
            message: 'GET all categories'
        });
    },

    createCategories: (req, res) => {
        res.status(200).json({
            message: 'created categories'
        });
    },

    updateCategories: (req, res) => {
        const articleId = req.params.articleId;
        res.status(200).json({
            message: `updated categories - ${articleId}`
        });
    },

    deleteCategories: (req, res) => {
        const articleId = req.params.articleId;
        res.status(200).json({
            message: `deleted categories - ${articleId}`
        });
    }
}