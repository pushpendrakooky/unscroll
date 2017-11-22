const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//const multer = require('multer');
var url = require('url');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
//var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use('/images', express.static(__dirname + '/Images'));
app.use('/thumbnail', express.static(__dirname + '/thumbnail'));
app.use('/Profile', express.static(__dirname + '/Profile'));
mongoose.connect('mongodb://localhost/insta');
mongoose.Promise = global.Promise;

app.get('/', function(req, res) {
    console.log("hello");
});


app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/' + "index.html");
})
app.get('/category', function(req, res) {
    res.sendFile(__dirname + '/' + "category.html");
});
app.get('/saveImage', function(req, res) {
    res.sendFile(__dirname + '/' + "uploadImage.html");
})
app.use('/api', require('./routes/api'));

app.listen(process.env.port || 3000, function(req, res, err) {
    console.log("Listening for request");

});