var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');

const session = require('express-session');
const {sessionStore} = require('./config/dbconn');

var mainRouter = require('./routes/main');
var loginRouter = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express)


// 상태 로그
// app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public', express.static(__dirname +'/public'));


app.use(session({
  secret: process.env.SECRET_KEY, // 암호화
  resave: false,                  // 세션을 언제나 저장
  saveUninitialized: true,        // 세션이 저장되기 전 uninitialized 상태로 미리 만들어 저장
  store: sessionStore,
  cookie: {
      maxAgeL: 1000 * 60 * 60
  }
}));





app.use('/', mainRouter);
app.use('/login', loginRouter);









// ERROR 잘못된 경로
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});


module.exports = app;
