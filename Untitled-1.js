const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Category = require('../models/category');
const multer = require('multer');

//var imager = require('multer-imager');

// let upload = multer({ storage: multer.memoryStorage() });
//var upload = multer({ dest: 'Images/' })
var img_name = '';
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'Images/')
    },
    filename: function(req, file, cb) {
        img_name = file.fieldname + '-' + Date.now() + '-' + file.originalname;
        cb(null, img_name)
    }
})
var upload = multer({ storage: storage });

//get list 
router.get('/insta', function(req, res) {
    res.send({ type: 'GET' });
});

// update
router.put('/insta', function(req, res) {
    res.send({ type: 'PUT' });
});

//Register New User
router.post('/signup', upload.single('img'), function(req, res) {
    // console.log(req.body.userEmail);
    var email = req.body.userEmail;
    User.count({ userEmail: email }, function(err, count) {
            if (count == 0) {
                User.create(req.body).then(function(user) {
                    res.send(user);
                });
            } else {
                res.send("Already Exist");

            }
        })
        // User.create(req.body).then(function(user) {
    res.send(user);
    // });
});
//add Category
router.post('/addCategory', function(req, res) {
    Category.create(req.body).then(function(category) {
        res.send(category);
    });
});

//display Category List
router.get('/categoryList', function(req, res) {
    Category.find(function(err, categoryList) {
        if (err) throw err;
        res.send(categoryList);
    });
});

router.post('/uploadImage', upload.single('img'), function(req, res) {

    console.log(req.body);
    console.log(req.file);
    res.send(img_name);
});
router.post('/insta', function(req, res) {
    res.send({ type: 'POST' });
});
router.delete('/insta', function(req, res) {
    res.send({ type: 'DELETE' });
});


module.exports = router;