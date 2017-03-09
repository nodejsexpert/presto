var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');
var verify= require('./routes/verify');

var app = express();

app.use(cors());

// view engine setup
app.set('port', process.env.PORT || 3030);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "presto_users",
  store: new MongoStore({
    url: "mongodb://localhost:27017/prestonew",
    autoReconnect: true
  })
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/query',index);
app.use('/userquery',index);
app.use('/users', users);
app.use('/login',index);
app.use('/loan',index);
app.use('/signup',index);

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
app.use('/verify/'+users._id+'/users',index);
//app.use('/users/'+users._id+'/resend',index);
app.use('/users/'+users._id+'/user',index);
app.use('/getinfo/'+users._id+'/users',index);
app.use('/user/'+users._id+'/update',index);
app.use('/user/'+users._id+'/query',index);
app.listen(app.get('port'), () => {
  console.log('App is running at http://localhost:%d in %s mode', app.get('port'), app.get('env'));
  console.log('  Press CTRL-C to stop\n');
});
module.exports = app;

    
