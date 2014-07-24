var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    price: Number
});

var Book = mongoose.model('Book', bookSchema);

mongoose.connect('mongodb://localhost/bookDatabase');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/books', function(req, res, next){
    var query = Book.find();
    query.exec(function(err, books){
        if(err) return next(err);
        res.send(books);
    });
});

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});