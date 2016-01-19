var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var contacts = require('./routes/contact');
var lists = require('./routes/list');

var connectionString = process.env.MONGO_DB || 'mongodb://localhost:27017/mike';

mongoose.connect(connectionString, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + connectionString + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + connectionString);
  }
});

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use('/api',contacts);
app.use('/api',lists);

app.get('/', function(req, res) {
  res.render('pages/index');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
