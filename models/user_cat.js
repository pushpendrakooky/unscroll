const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user_cate = new Schema({
    cate_id: {
        type: String,
        default: ''
    },
    user_id: {
        type: String,
    }

});

var collectionName = 'user_cat';
const user_cat = mongoose.model('user_cat', user_cate);

module.exports = user_cat;