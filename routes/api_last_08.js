const express = require('express');
var app = express();
const router = express.Router();
const User = require('../models/user');
const Category = require('../models/category');
const multer = require('multer');
var imager = require('multer-imager');
var nodemailer = require('nodemailer');
const Image = require('../models/image');
const img_like = require('../models/like')
const hash = require('../models/hashtag');
const user_cate = require('../models/user_cat');
const img_invitation = require('../models/Invite');
const cat_img = require('../models/cat_images');
// let upload = multer({ storage: multer.memoryStorage() });
//var upload = multer({ dest: 'Images/' })
var img_name = '';

var iii = '';

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'Images/')
    },
    filename: function(req, file, cb) {
        img_name = file.fieldname + '-' + Date.now() + '-' + file.originalname;
        cb(null, img_name);
    }
})

var upload = multer({ storage: storage })

//Register New User


var storage1 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'Profile/')
    },
    filename: function(req, file, cb) {
        img_name = file.fieldname + '-' + Date.now() + '-' + file.originalname
        cb(null, img_name)
    }
})


var upload1 = multer({ storage: storage1 })




router.post('/signup', upload1.single('profileImg'), function(req, res) {
    var email = req.body.userEmail;

    var data = Array();
    var arr = []
    arr = Array();
    arr = { "name": req.body.name, "userEmail": req.body.userEmail, "profileImg": img_name, "userPassword": req.body.userPassword }

    res.send
    var randomnumber = Math.floor(Math.random() * 90000) + 10000;
    //  console.log(randomnumber);

    data = { 'name': req.body.name, 'userEmail': email, 'otp': randomnumber };
    // var createTransport = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: 'pushpendrasngh672@gmail.com',
    //         pass: 'xxxxxxxxxx'
    //     }
    // });

    // var mailOptions = {
    //     from: 'pushpendrasngh672@gmail.com',
    //     to: 'kookyinfomedia@gmail.com',
    //     Subject: 'Test Node Mailer',
    //     text: "This Is Testing Mail Sent through nodeMailer"

    // }
    // createTransport.sendMail(mailOptions, function(err, res) {
    //         if (err) {
    //             throw err;
    //         } else {
    //             console.log(res.response);
    //         }

    //     })
    User.count({ userEmail: email }, function(err, count) {
        if (count == 0) {
            User.create(arr).then(function(user) {

                var query = { "_id": user._id };
                var update = { $set: { user_id: user._id } }
                var options = { new: true };
                User.findByIdAndUpdate(query, update, options, function(err, user) {
                    if (err) {
                        console.log('got an error');
                    } else {
                        res.type('application/json');
                        res.setHeader("Content-Type", "application/json");
                        res.json({ response: 0, data: user, message: "Account Created" });
                    }
                    //    return person;
                });
            });
        } else {
            res.type('application/json');
            res.setHeader("Content-Type", "application/json");
            res.json({ response: 0, data: 'user', message: " Account Already Created" });


        }
    })
});
//login id
router.post('/login', upload.single('img'), function(req, res) {
    User.count({ userEmail: req.body.userEmail, userPassword: req.body.userPassword }, function(err, count) {
        if (count == 1) {
            User.findOne({ userEmail: req.body.userEmail, userPassword: req.body.userPassword }, function(err, user) {
                res.type('application/json');
                res.setHeader("Content-Type", "application/json");
                res.json({ response: 1, data: user, message: " Account login" });
            })

        } else {
            res.type('application/json');
            res.setHeader("Content-Type", "application/json");
            res.json({ response: 0, data: "user", message: "Invalid login" });

        }
    });
})


//add Category
router.post('/addCategory', upload.single('img'), function(req, res) {
    Category.create(req.body).then(function(category) {
        var query = { "_id": category._id };
        var update = { $set: { category_id: category._id } }
        var options = { new: true };
        Category.findByIdAndUpdate(query, update, options, function(err, cat) {
            if (err) {
                console.log('got an error');
            } else {
                res.type('application/json');
                res.setHeader("Content-Type", "application/json");
                res.json({ response: 0, data: cat, message: "Category List" });
            }
            //    return person;
        });
    });
});
// Api for Fb Login
router.post('/fbLogin', upload.single('img'), function(req, res) {
    data = Array();

    if (req.body.userEmail != '' && req.body.name != '' && req.body.fbId != '') {

        User.count({ userEmail: req.body.userEmail, fbId: req.body.fbId }, function(err, count) {
            if (count == 0) {
                data['response'] = 1;
                User.create(req.body).then(function(user) {
                    var query = { "_id": user._id };
                    var update = { $set: { user_id: user._id } }
                    var options = { new: true };
                    User.findByIdAndUpdate(query, update, options, function(err, user) {
                        if (err) {
                            console.log('got an error');
                        } else {
                            res.type('application/json');
                            res.setHeader("Content-Type", "application/json");
                            res.json({ response: 0, data: user, message: "Account Created" });
                        }
                        //    return person;
                    });
                });

            } else {
                User.findOne({ userEmail: req.body.userEmail, fbId: req.body.fbId }, function(err, user) {
                    res.type('application/json');
                    res.setHeader("Content-Type", "application/json");
                    res.json({ response: 1, data: user, message: " Account login" });
                })
            }
        })
    } else {
        res.json({ response: 0, data: [], message: " Data missing" });

    }

});

//Api for gplus
router.post('/gPlusLogin', upload.single('img'), function(req, res) {
    data = Array();
    if (req.body.userEmail != '' && req.body.name != '' && req.body.gPlusId != '') {

        User.count({ userEmail: req.body.userEmail, gPlusId: req.body.gPlusId }, function(err, count) {
            if (count == 0) {
                data['response'] = 1;
                User.create(req.body).then(function(user) {
                    var query = { "_id": user._id };
                    var update = { $set: { user_id: user._id } }
                    var options = { new: true };
                    User.findByIdAndUpdate(query, update, options, function(err, user) {
                        if (err) {
                            console.log('got an error');
                        } else {
                            res.type('application/json');
                            res.setHeader("Content-Type", "application/json");
                            res.json({ response: 0, data: user, message: "Account Created" });
                        }
                        //    return person;
                    });
                });

            } else {
                User.findOne({ userEmail: req.body.userEmail, gPlusId: req.body.gPlusId }, function(err, user) {
                    res.type('application/json');
                    res.setHeader("Content-Type", "application/json");
                    res.json({ response: 1, data: user, message: " Account login" });
                })
            }
        })
    } else {
        res.json({ response: 0, data: [], message: " Data missing" });
    }
});


//display Category List
router.get('/categoryList', function(req, res) {

    Category.find(function(err, categoryList) {
        if (err) { throw err; } else {

            res.type('application/json');
            res.setHeader("Content-Type", "application/json");
            res.json({ response: 1, data: categoryList, message: " Account login" });

        }
    });
});
//Show All Uploads
router.get('/showUploads', upload.single('img'), function(req, res) {
    Image.find(function(err, img_list) {
        if (img_list.length == 0) {
            res.type('application/json');
            res.setHeader("Content-Type", "application/json");
            res.json({
                response: 1,
                data: "[]",
                message: " Image List Is Empty"
            });
        } else {

            res.type('application/json');
            res.setHeader("Content-Type", "application/json");
            res.json({ response: 1, data: img_list, message: " Image List" });

        }
    });
});
//get Category Count
router.get('/count', upload.single('img'), function(req, res) {
    var test = '';
    var nodeArr;
    var cat_arr = new Array();
    var cat_img_c = new Array();
    Category.find(function(e, cl) {
        for (var x in cl) {
            c_cal = cl[x];
            // Image.find({ "category": { "$regex": c_cal._id, "$options": "i" } }).count(function(err, img_list1) {
            //     console.log(c_cal._id + "to ==" + img_list1);
            //     test = test + ',' + img_list1;
            // });
            img_count(c_cal._id, function(res) {
                console.log(res);
                nodeArr = res;
            });
        }
    });
    console.log("-----------");
    console.log(test);


    var chk = [];
    Image.find(function(err, img_list) {
        for (var i in img_list) {
            val = img_list[i];
            //  console.log(val.category);
        }
        chk = img_list;
    });
});

function img_count(cid, callback) {
    Image.find({ "category": { "$regex": cid, "$options": "i" } }).count(function(err, img_list1) {


        var query = { "_id": cid };
        var update = { $inc: { img_count: img_list1 } }
        var options = { new: true };
        Category.findByIdAndUpdate(query, update, options, function(err, person) {
            if (err) {
                console.log('got an error');
            }
            //   console.log(person);
            // at this point person is null.
        });
        console.log(cid + "------------to ==" + img_list1);
    });

}
router.post('/imgUpload', upload.single('img'), function(req, res) {
    var resizeImage = require('resize-image');
    var fs = require('fs'),
        gm = require('gm');

    // Include ImageMagick
    var im = require('imagemagick');
    var thumb = require('node-thumbnail').thumb;
    thumb({
        source: 'Images/' + img_name, // could be a filename: dest/path/image.jpg
        destination: 'thumbnail/',
        suffix: '',
        concurrency: 4,
        width: 200,
    }).then(function(err, data) {
        //     console.log("success");
    }).catch(function(e) {
        console.log('Error', e.toString());
    });
    var arr;
    cat_id = req.body.category;
    arr = cat_id.split(",");
    // console.log(arr);

    var user;
    user_id = req.body.tag;
    user = user_id.split(",");

    for (var i = 0; i < arr.length; i++) {

        var query = { "_id": arr[i] };
        var update = { $inc: { img_count: 1 } }
        var options = { new: true };

        Category.findByIdAndUpdate(query, update, options, function(err, person) {
            //     console.log("Category_di = " + person);
        });
        a = ({ 'cat_id': arr[i], 'img_name': img_name });
        cat_img.create(a).then(function(er, re) {});
    }

    //Get# tag
    var tag = req.body.description.split('#')
    console.log(req.body.description.split('#'));
    for (var a = 1; a < tag.length; a++) {
        ta = { 'hash_name': tag[a], 'img_name': img_name, 'user_id': req.body.user_id };
        ch(tag[a], img_name, req.body.user_id);
        // hash.count({ hash_name: tag[a] }, function(err, count) {
        //     if (count == 0) {
        //         ta = { 'hash_name': tag[a], 'img_name': img_name, 'user_id': req.body.user_id };
        //         console.log(ta);
        //         hash.create(ta).then(function(user) {
        //             console.log("done");
        //         });
        //     }
        // })
    }
    arr = {
        'user_id': req.body.user_id,
        'img': img_name,
        'thumb_image': img_name,
        'category': req.body.category,
        'share': user.length
    }
    var img_n_id = '';
    Image.create(arr).then(function(image) {
        img_n_id = image._id;
        var query = { "_id": image._id };
        var update = { $set: { image_id: image._id } }
        var options = { new: true };
        Image.findByIdAndUpdate(query, update, options, function(err, image) {
            if (err) {
                console.log('got an error');
            } else {


                res.type('application/json');
                res.setHeader("Content-Type", "application/json");
                res.json({ response: 0, data: image, img_path: __dirname + "/Images/" + img_name, thumb_path: __dirname + "/thumbnail/" + img_name, message: " Image Upload Success" });
            }
            //    return person;
        });
    })
    for (var x = 0; x < user.length; x++) {


        var query = { "_id": user[x] };
        var update = { $inc: { totalInvite: 1 } }
        var options = { new: true };
        User.findByIdAndUpdate(query, update, options, function(err, person) {
            //   console.log("user_id = " + res);
        })
        iarr = { 'user_id': user[x], 'img_id': img_name }
        console.log(iarr);
        img_invitation.create(iarr).then(function(invite) {

        });
    }
})

function ch(e, img_name, user_id) {
    ta = { 'hash_name': e, 'img_name': img_name, 'user_id': user_id };
    console.log(ta['hash_name']);
    if (ta['hash_name'] != '') {
        hash.create(ta).then(function(user) {
            console.log("done");
        });
    }
}
//search Hash

router.post('/searchHash', upload.single('img'), function(req, res) {

    var data = Array();
    hash.find({ hash_name: new RegExp('^' + req.body.hash + '$', "i") }, function(err, doc) {
        //Do your action here..
        if (err) {

            res.json({ response: 0, data: "fail", message: " Image Downloadding" });
        } else {

            res.json({ response: 1, data: doc, message: " Hash Search" });
        }

    });
});


// Show User Uploaded Image
router.post('/myUploads', upload.single('img'), function(req, res) {
    Image.find({ 'user_id': req.body.user_id }, function(err, img_list) {
        res.send(img_list);
    });
});
//Upload Image
router.post('/uploadImage', upload.single('img'), function(req, res) {
    let arr = {
        'user_id': req.body.user_id,
        'category': req.body.Category_id,
        'full_image': req.file.filename
    }
    Image.create(arr).then(function(image) {
        res.send(image);
    });
});


// find image According To the Category

router.post('/getImage', upload.single('img'), function(req, res) {
    Image.find({ "category": { "$regex": req.body.Category_id, "$options": "i" } }, function(err, img_list) {
        res.send(img_list);
    });
});
//
//Download Image
router.post('/downloadImage', upload.single('img'), function(req, res) {


    var query = { "_id": req.body.img_id };
    var update = { $inc: { downloads: 1 } }
    var options = { new: true };
    Image.findByIdAndUpdate(query, update, options, function(err, person) {
        if (err) {

            res.json({ response: 0, data: "fail", message: " Image Downloadding" });
        } else {

            res.json({ response: 1, data: req.body, message: " Image Download Success" });
        }
    })
})

router.post('/shareImage', upload.single('img'), function(req, res) {


    var query = { "_id": req.body.img_id };
    var update = { $inc: { share: 1 } }
    var options = { new: true };


    Image.findByIdAndUpdate(query, update, options, function(err, person) {
        if (err) {

            res.json({ response: 0, data: "fail", message: " Image Downloadding" });
        } else {

            res.json({ response: 1, data: req.body, message: " Image Download Success" });
        }
    })
});



router.post('/OtpVerify', upload.single('img'), function(req, res) {

    email = req.body.userEmail;

    otp = req.body.otp;
    res.type('application/json');
    res.setHeader("Content-Type", "application/json");

    User.findOne({ userEmail: email, otp: otp }, function(err, found) {
        if (!found) {
            res.json({ response: 1, data: "user", message: " Invalid Data" });

        } else {

            User.findOne({ userEmail: email }, function(err, user) {
                    //     res.send(user._id);
                    User.findByIdAndUpdate({ "_id": user._id }, { $inc: { otp: -otp }, $set: { isOtpVerify: true } }, { new: true }, function(err, person) {
                        if (err) {

                            res.json({ response: 0, data: "fail", message: " Otp Not Verify" });
                        } else {
                            //         res.send(person);

                            res.json({ response: 1, data: user, message: " OTP Verify Success" });
                        }
                    })

                })
                // var query = { "userEmail": email };
                // var update = { $set: { otp: 0 }, $set: { isOtpVerify: true } }
                // var options = { new: true };



            // Image.findOneAndUpdate({ "userEmail": email }, { $set: { otp: 0 }, $set: { isOtpVerify: true } }, { new: true }, function(err, person) {
            //     if (err) {

            //         res.json({ response: 0, data: "fail", message: " Otp Not Verify" });
            //     } else {
            //         res.send(person);

            //         //res.json({ response: 1, data: req.body, message: " OTP Verify Success" });
            //     }
            // })
        }
        // if (count == 1) {

        //     var query = { "userEmail": email };
        //     var update = { $set: { otp: 0, isOtpVerify: true } }
        //     var options = { new: true };

        //     Image.findByIdAndUpdate(query, update, options, function(err, person) {
        //         if (err) {

        //             res.json({ response: 0, data: "fail", message: " Otp Not Verify" });
        //         } else {

        //             res.json({ response: 1, data: req.body, message: " OTP Verify Success" });
        //         }
        //     })

        // } else {

        //     res.type('application/json');
        //     res.setHeader("Content-Type", "application/json");
        //     res.json({ response: 1, data: "user", message: " Invalid Data" });
        // }
    })


    // var query = { "_id": req.body.img_id };
    // var update = { $inc: { share: 1 } }
    // var options = { new: true };
});

router.post('/resetPassword', upload.single('img'), function(req, res) {

    var query = { "_id": req.body.user_id };
    var update = { $set: { userPassword: req.body.userPassword } }
    var options = { new: true };

    User.findByIdAndUpdate(query, update, options, function(err, person) {

        res.type('application/json');
        res.setHeader("Content-Type", "application/json");

        if (err) {

            res.json({ response: 0, data: "fail", message: " Password Not Chaange" });
        } else {

            res.json({ response: 1, data: req.body, message: " Password Verify Change" });
        }
    })


})



var storage2 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'Profile1/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})


var upload2 = multer({ storage: storage2 })

router.post('/editProfile', upload1.single('profileImg'), function(req, res) {
    arr = Array();
    arr = { "name": req.body.name, "profileImg": img_name }
    console.log(img_name);
    var query = { "_id": req.body.user_id };
    var update = { $set: { "name": req.body.name, profileImg: img_name } }
    var options = { new: true };
    User.findByIdAndUpdate(query, update, options, function(err, person) {
        if (err) {
            var data = Array();
            res.type('application/json');
            res.setHeader("Content-Type", "application/json");

            res.json({ response: 0, data: [], message: " Edit fail" });
        } else {
            var data = Array();
            res.type('application/json');
            res.setHeader("Content-Type", "application/json");

            res.json({ response: 1, data: person, message: " Edit Success" });
        }
        //   console.log(person);
        // at this point person is null.
    });
    res.send(arr);

});
//Mylikes
router.post('/myLikes', upload.single('img'), function(req, res) {

    var data = Array();
    res.type('application/json');
    res.setHeader("Content-Type", "application/json");

    img_like.find({ 'user_id': req.body.user_id }, function(err, user) {
        if (err) {

            res.json({ response: 0, data: "fail", message: " Unable To get List" });
        } else {
            //            console.log(user)
            res.json({ response: 1, data: user, message: " List of My likes" });
        }
    })
});



//Like Image
router.post('/imgLike', upload.single('img'), function(req, res) {

    res.type('application/json');
    res.setHeader("Content-Type", "application/json");

    console.log(req.body);
    img_like.count({ img_id: req.body.img_id, user_id: req.body.user_id }, function(err, count) {

        if (count == 0) {

            var query = { "_id": req.body.img_id };
            var update = { $inc: { img_like: 1 } }
            var options = { new: true };

            Image.findByIdAndUpdate(query, update, options, function(err, person) {
                if (err) {

                    res.json({ response: 0, data: "fail", message: " Like Failed" });
                } else {

                    res.json({ response: 1, data: req.body, message: " Like Success" });
                }
            })


            img_like.create(req.body).then(function(image) {
                res.send(image);
            });
        } else {

            var query = { "_id": req.body.img_id };
            var update = { $inc: { img_like: -1 } }
            var options = { new: true };

            Image.findByIdAndUpdate(query, update, options, function(err, person) {
                if (err) {

                    res.json({ response: 0, data: "fail", message: " Image Downloadding" });
                } else {

                    res.json({ response: 1, data: req.body, message: " Unlike Success" });
                }
            });
            img_like.findOneAndRemove({ user_id: req.body.user_id, img_id: req.body.img_id }).then(function(image) {
                res.send(image);
            });

        }
    });
})
router.post('/changePassword', upload.single('img'), function(req, res) {
    var query = { "_id": req.body.user_id };
    var update = { $set: { userPassword: req.body.userPassword } }
    var options = { new: true };

    // User.findByIdAndUpdate()
    User.findByIdAndUpdate(query, update, options, function(err, person) {
        if (err) {

            res.json({ response: 0, data: "fail", message: " Image Downloadding" });
        } else {

            res.json({ response: 1, data: person, message: " Reset Password Success" });
        }
    });

})

//myFeeds
router.post('/Feeds', upload.single('img'), function(req, res) {
    res.type('application/json');
    res.setHeader("Content-Type", "application/json");
    var action = req.body.action;
    var idArr = Array();

    if (req.body.user_id != "") {
        id = req.body.user_id;
        //for like button
        img_like.find().where('user_id').equals(req.body.user_id).exec(function(err, list) {
            if (list.length != 0) {
                for (var a = 0; a < list.length; a++) {
                    forLike(list[a].img_id);
                }
            }
        });
        //for myInvitation
        if (action == "invite") {
            iarr = Array();
            img_invitation.find().where('user_id').equals(id).exec(function(err, list) {
                // console.log("Invite List");
                for (var r = 0; r < list.length; r++)
                    iarr.push(list[r].img_id)
                Image.find({}).select({ 'img': 1, 'user_id': 1, 'description': 1 }).where('img').in(iarr).exec(function(err, result) {
                    res.json({ response: 1, data: result, message: "IMage List" });
                })
            })
        }

        //for MyLikes
        if (action == "likes") {
            narr = Array();
            img_like.find().where('user_id').equals(req.body.user_id).exec(function(err, data) {
                for (var p = 0; p < data.length; p++) {
                    narr.push(data[p].img_id);
                }
                Image.find().where('image_id').in(narr).exec(function(err, result) {
                    res.json({ response: 1, data: result, message: "IMage List" });
                })
            })
        }
        //for myLike
        if (req.body.myLikes == 1) {
            arr = Array();
            img_like.find().where('user_id').equals(id).exec(function(err, likeList) {
                for (var l = 0; l < likeList.length; l++) {
                    Image.find().where('image_id').equals(likeList[l].img_id).exec(function(err, lList) {
                        data['img'] += list
                    })

                    res.json({ response: 1, data: arr, message: "IMage List" });
                }
            })
        }
        if (action == "myCategory") {
            //  console.log("hell0");
            user_cate.find().select('user_id').where('user_id').equals(id).exec(function(err, result) {

            });
        }



    } else {
        Image.find(function(err, img_list) {
            res.json({ response: 1, data: img_list, message: "IMage List" });
        })
    }

});

function getCatImg(cid) {
    return cid;
}

function go(arr) {
    narr = arr;
    console.log(narr);
    Image.find().where('image_id').in(narr).exec(function(err, result) {
        return (result);
    })
}

function getId(e) {
    Image.findById(e).exec(function(err, result) {
        console.log(result);
    })

}

function forLike(e) {
    //console.log(e)
    var query = { "_id": e };
    var update = { $set: { iLike: true } }
    var options = { new: true };
    // User.findByIdAndUpdate()
    Image.findByIdAndUpdate(query, update, options, function(err, person) {
        //console.log(person);
    });

}
//choose Category
router.post('/chooseCategory', upload.single('img'), function(req, res) {
    cat = req.body.cat_id;
    user_id = req.body.user_id;
    arr = cat.split(",");
    for (var t = 0; t < arr.length; t++) {
        ar = { "user_id": user_id, "cate_id": arr[t] }
        user_cate.create(ar).then(function(er, data) {

        })
    }


});

//module.exports = router;

module.exports = router;