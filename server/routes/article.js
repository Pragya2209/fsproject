const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/article');
const middleware = require('../middleware');

router.get('/categories', ArticleController.getCategories);
router.get('/authors', ArticleController.getAuthors);
router.get('/:articleId', ArticleController.getArticle);
router.post('/', ArticleController.getAllArticles);
router.post('/content',ArticleController.updateArticle);

module.exports = router;