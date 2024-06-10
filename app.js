//設定ファイル(require()で設定の読み込みをする模様)
var createError = require('http-errors'); //HTTPエラーの対処を行うもの
var express = require('express');         //express本体
var path = require('path');               //ファイルパスを扱う
var cookieParser = require('cookie-parser');  //クッキーのパース（値の変換）
var logger = require('morgan');           //HTTPリクエストのログ出力

//ルート用モジュールのロード
var indexRouter = require('./routes/index');  //index.jsは/indexにアクセスしたときの処理
var usersRouter = require('./routes/users');
var helloRouter = require('./routes/hello');
var notesRouter = require('./routes/notes');
var db_notesRouter = require('./routes/db_notes');
var catRouter = require('./routes/cat');

//Expressのオブジェクトを作成
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//関数の組み込み（上記でロードしたモジュールの機能を呼び出せるようにしている）
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ルート用、エラー用のapp.use
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello', helloRouter);
app.use('/notes', notesRouter);
app.use('/db_notes', db_notesRouter);
app.use('/cat', catRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
