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

var orderSchema = new mongoose.Schema({
    name: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    giftwrap: Boolean,
    products: []
});

var Order = mongoose.model('Order', orderSchema);
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

app.get('/api/order', function(req, res, next){
    var query = Order.find();
    query.exec(function(err, orders){
        if(err) return next(err);
        res.send(orders);
    })
})

app.post('/api/order', function(req, res, next){
    console.log(req.body);
    var order = new Order({
        name: req.body.name,
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
        giftwrap: req.body.giftwrap,
        products: req.body.products
    });
    order.save(function(err){
        if(err) return next(err);
        res.send(order);
    });
});

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});