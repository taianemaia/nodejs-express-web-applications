const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');


const config = {
    user: 'taiane.maia',
    password: '@p1p0c4!',
    server: 'pluralsight-courses.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'node-express-web-applications',
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};

sql.connect(config).catch((err) => debug(err));

const app = express();

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
    { title: 'Books', link: '/books' },
    { title: 'Authors', link: '/authors' }
];

app.get('/', (req, res) => {
    res.render('index', {
        nav,
        title: 'Library'
    });
});

const bookRouter = require('./src/routes/bookRoutes')(nav);

app.use('/books', bookRouter);

app.listen(3000, () => {
    debug(`Listening on port ${chalk.blue(3000)}`);
});
