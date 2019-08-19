const express = require('express');
const bookController = require('../controllers/bookController');

const bookRouter = express.Router();
const bookService = require('../services/goodReadsService');

const router = (nav) => {
    const { getAll, getById, middleware } = bookController(bookService, nav);
    bookRouter.use(middleware);

    bookRouter.route('/')
        .get(getAll);

    bookRouter.route('/:id')
        .get(getById);
    return bookRouter;
};

module.exports = router;
