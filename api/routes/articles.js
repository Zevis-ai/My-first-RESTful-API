const express = require('express')
const router = express.Router()
const upload = require('../middlewares/upload')
const checAuth = require('../middlewares/checkAuth')

const {
    getAllArticles,
    createArticle,
    getArticle,
    updateArticle,
    deleteArticle
} = require("../controllers/articles")


router.get('/', getAllArticles)
router.get('/:articleId', getArticle)

router.post('/',upload.single('image'), checAuth, createArticle)
router.patch('/:articleId', checAuth, updateArticle)
router.delete('/:articleId', checAuth, deleteArticle)

module.exports = router