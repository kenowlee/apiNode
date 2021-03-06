const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    i18n = require('i18n'),
    app = express();

require('./process')(app);

app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Headers', 'Content-type, Accept, Authorization');

    console.log('IP: ', req.connection.remoteAddress);

    next();
});

i18n.configure({
    locales: ['br', 'en'],

    directory: __dirname + '/locales',
    register: global,
});

app.use(
    i18n.init,
    morgan('dev'),
    bodyParser.json({ limit: '1000MB' }),
    bodyParser.urlencoded({ extended: true })
);

require('./src/connection/log')(app);
require('./src/connection/agenda')(app);

module.exports = app;

