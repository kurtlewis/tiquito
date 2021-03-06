var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var api = require('./api');
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//load style preprocessing middleware (only works for flat page structure)
app.use(require('node-sass-middleware')({
  root: path.join('public','stylesheets'),
  src: 'scss',
  dest: '.',
  debug: true,
  outputStyle: 'compressed',
  force: true,
  error:function(err){
    console.log("Sass compilation error: " + err);
  }
}));

app.use(express.static(path.join(__dirname, 'public')));

/*
//if the redir param is present, redirect
app.post('*',function(req,res,next){
  if(req.body.redir){
    res.redirect(req.body.redir);
  } else {
    next();
  }
});
*/

// handle requests to api
app.use(/\/api/, api);

//do routing for basic rendering functionality (get requests)
app.get(/^\/([a-z0-9-_]*)\/?$/i,function(req,res){
  var targetUrl = req.params[0];

    res.render(`${targetUrl}`,{
      "title": targetUrl
    },function(err,html){
      if(!err){
        res.send(html);
      }
      
      if((err.message).slice(0,21) == 'Failed to lookup view'){
        res.render('notfound');
      }

    });



});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
