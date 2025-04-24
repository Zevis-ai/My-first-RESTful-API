import mongoose from 'mongoose';
import Article from '../models/article.js';
import Category from '../models/category.js';

export const getAllArticles = (req, res) => {
    Article.find().populate('categoryId', 'title').then((articles) => {
        res.status(200).json({ articles });
    }).catch(err => {
        res.status(500).json({ err });
    });
};

export const createArticle = (req, res) => {
    const { path: image } = req.file;
    const { title, description, content, categoryId } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ message: 'Invalid categoryId format' });
    }
    
    Category.findById(categoryId).then(category => {
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const article = new Article({
            _id: new mongoose.Types.ObjectId(),
            title,
            description,
            content,
            categoryId,
            image: image.replace(/\\/g, '/')
        });

        return article.save();
    }).then(result => {
        if (!result) {
            return res.status(500).json({ message: 'Failed to create article' });
        }

        res.status(201).json({ message: 'Article created successfully', articleId: result._id });
    }).catch(err => {
        console.error("Error creating article:", err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    });
};

export const getArticle = (req, res) => {
    const articleId = req.params.articleId;
    Article.findById(articleId).then((article) => {
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(200).json({ article });
    }).catch(err => {
        res.status(500).json({ err });
    });
};

export const updateArticle = async (req, res) => {
    try {
        const articleId = req.params.id;
        const { categoryId } = req.body;

        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        if (categoryId) {
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
        }

        await Article.updateOne({ _id: articleId }, req.body);
        return res.status(200).json({ message: 'Article updated' });

    } catch (err) {
        console.error("🔥 Error in updateArticle:", err); // תוספת חשובה מאוד
            return res.status(500).json({ err: err.message || err });
    }
};

export const deleteArticle = async (req, res) => {
    try {
        const articleId = req.params.articleId;

        const article = await Article.findById(articleId);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        await Article.deleteOne({ _id: articleId });
        return res.status(200).json({ message: `Deleted article - ${articleId}` });

    } catch (err) {
        return res.status(500).json({ err });
    }
};

