const express = require('express')
const router = express.Router()

const {
    getAllCategories,
    createCategories,
    getCategories,
    updateCategories,
    deleteCategories
} = require("../controllers/categories")

router.get('/', getAllCategories)
router.post('/', createCategories)
router.get('/:categoryId', getCategories)
router.patch('/:categoryId', updateCategories)
router.delete('/:categoryId', deleteCategories)

module.exports = router