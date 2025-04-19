import express from 'express';
import {
    getAllCategories,
    createCategories,
    getCategories,
    updateCategories,
    deleteCategories
} from '../controllers/categories.js';

const router = express.Router();

router.get('/', getAllCategories);
router.post('/', createCategories);
router.get('/:categoryId', getCategories);
router.patch('/:categoryId', updateCategories);
router.delete('/:categoryId', deleteCategories);

export default router;
