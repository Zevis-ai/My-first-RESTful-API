import express from 'express';
import upload from '../middlewares/upload.js';
import checkAuth from '../middlewares/checkAuth.js';

import {
    getAllArticles,
    createArticle,
    getArticle,
    updateArticle,
    deleteArticle
} from "../controllers/articles.js";

const router = express.Router();

router.get('/', getAllArticles);
router.get('/:articleId', getArticle);

router.post('/', upload.single('image'), checkAuth, createArticle);
router.patch('/:articleId', checkAuth, updateArticle);
router.delete('/:articleId', checkAuth, deleteArticle);

export default router;
