const express = require('express');

const bookRouter = express.Router();
const sql = require('mssql');

const router = (nav) => {
    bookRouter.route('/')
        .get((req, res) => {
            (async function query() {
                const request = new sql.Request();
                const result = await request.query('SELECT * FROM books');
                res.render('bookListView', {
                    nav,
                    title: 'Library',
                    books: result.recordset
                });
            }());
        });

    bookRouter.route('/:id')
        .all((req, res, next) => {
            (async function query() {
                const request = new sql.Request();
                const { recordset } = await request.input('id', sql.Int, req.params.id)
                    .query('SELECT * FROM books WHERE id = @id');
                req.book = recordset[0];
                next();
            }());
        })
        .get((req, res) => {
            res.render('bookView', {
                nav,
                title: 'Library',
                book: req.book
            });
        });

    return bookRouter;
};

module.exports = router;
