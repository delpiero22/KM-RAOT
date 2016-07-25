'use strict';

import * as express from 'express';
import * as path from 'path';
import * as cookieParser from 'cookie-parser';
import * as  bodyParser from 'body-parser';
import * as  session from 'express-session';

import * as routes from './routes/index';

const app = express();

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'somesecret',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/lib',express.static(path.join(__dirname, '../node_modules')));
app.use('/app',express.static(path.join(__dirname, '../app')));
app.use('/css',express.static(path.join(__dirname, '../public/assets/css')));
app.use('/js',express.static(path.join(__dirname, '../public/assets/js')));
app.use('/config',express.static(path.join(__dirname, '../config')));

app.use('/', routes);

let port: number = process.env.PORT || 3000;

let server = app.listen(port, function() {
    let host = server.address().address;
    let port = server.address().port;
    console.log('This express app is listening on port:' + port);
});

export = app;
