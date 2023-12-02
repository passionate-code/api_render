var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
// define router
var indexRouter = require('./routes/index');

// view engine setup
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

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

// execute cron-node to perform scheduled cron job to check sites
//var {SitesModel} = require('./create_mongo_db.js'); //import sitesmodel stored in mongodb
//var {names_urls} = require('./check_sites.js'); //import promise array names_urls
//var {check_sites_scheduler} = require('./cron_task.js'); //import promise array names_urls
//check_sites_scheduler(names_urls,SitesModel); // execute check_sites_scheduler to execute cron job that update mongodb database of sites

module.exports = app;
