const debug = require('debug')('app:bookController');
const { MongoClient, ObjectID } = require('mongodb');

const bookController = (bookService, nav) => {
    const getAll = (req, res) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function mongo() {
            let client;

            try {
                client = await MongoClient.connect(url);
                const db = client.db(dbName);

                const col = await db.collection('books');
                const books = await col.find().toArray();

                res.render('bookListView', {
                    nav,
                    title: 'Library',
                    books
                });
            } catch (err) {
                debug(err.stack);
            }

            client.close();
        }());
    };

    const getById = (req, res) => {
        const url = 'mongodb://localhost:27017';
        const dbName = 'libraryApp';

        (async function mongo() {
            let client;

            try {
                client = await MongoClient.connect(url);
                const db = client.db(dbName);

                const col = await db.collection('books');
                const book = await col.findOne({ _id: new ObjectID(req.params.id) });
 
                book.details = await bookService.getBookById(book.bookId);
                res.render('bookView', {
                    nav,
                    title: 'Library',
                    book
                });
            } catch (err) {
                debug(err.stack);
            }

            client.close();
        }());
    };

    const middleware = (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    };

    return {
        getAll,
        getById,
        middleware
    };
};

module.exports = bookController;
