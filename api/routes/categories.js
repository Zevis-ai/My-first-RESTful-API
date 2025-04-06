const exports = require('express')
const router = exports.Router()

const {
    getAllCategories,
    createCategories,
    updateCategories,
    deleteCategories
} = require("../controllers/categories")

router.get('/', getAllCategories)
router.post('/', createCategories)
router.patch('/:articleId', updateCategories)
router.delete('/:articleId', deleteCategories)

module.exports = router