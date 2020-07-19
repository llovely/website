// 
// app.js
//
// Functions as a web-server, intended to serve the REACT front-end.
// 
// Author: Luis Love
//

var express = require('express');
var path = require('path');
var serveIndex = require('serve-index');
var logger = require('morgan');


var app = express();


// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Lists contents of 'public' directory as the server's root directory
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', 
          express.static(path.join(__dirname, 'public')), 
          serveIndex(path.join(__dirname, 'public'), 
                     { 'icons': true })
        );


// Handle 404 error by sending custom response
app.use(function(req, res, next) {
  res.status(404);

  // HTML response
  if (req.accepts('html')) {
    res.render('error_404', { title: '404 Error', url: req.url });
  }
  // JSON response
  else if (req.accepts('json')) {
    res.send({ error: 'Not Found!' });
  }
  // Plain-text response
  else {
    res.type('txt').send('Not Found!');
  }
});

// Handle 500 error by sending custom response
app.use(function(err, req, res, next) {
  res.status(500);

  // HTML response
  if (req.accepts('html')) {
    res.render('error_500', { title: '500 Error' });
  }
  // JSON response
  else if (req.accepts('json')) {
    res.send({ error: 'Something went wrong!' });
  }
  // Plain-text response
  else {
    res.type('txt').send('Something went wrong!');
  }
});


module.exports = app;
