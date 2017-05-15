var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var autoRoutes = require('express-auto-routes');
var CORS = require('./middlewares/CORS');
var simpleLogger = require('./middlewares/simpleLogger');

var app = express();
app.use(CORS);
app.use(simpleLogger);
// parse application/json 
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// auto mount routes
var routes = autoRoutes(app);
routes(path.join(__dirname, './controllers'));

// 404
app.use(function(req, res, next) {
  res.status(404);
  next({ _code: 404, _msg: 'Page not found' });
});

// global err handler
app.use(function(err, req, res, next) {
  console.error(err);
  
  if (err._status) res.status(err._status);

  res.json({
    _code: err._code || 1,
    _msg: err._msg || err
  });
});

if (!module.parent) {
  var PORT = 9090;
  console.log('[INFO] 美登官网接口端口：', PORT);
  app.listen(PORT);
} else {
  module.exports = app;
}
