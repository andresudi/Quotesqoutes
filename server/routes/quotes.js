var express = require('express');
var router = express.Router();
const { createQuote, listAllQuote, deleteQuote } = require('../controllers/quotesController');
const isLogin = require('../middlewares/isLogin');

router.get('/', listAllQuote)
router.post('/', isLogin, createQuote)
router.delete('/:id', isLogin, deleteQuote)

module.exports = router;