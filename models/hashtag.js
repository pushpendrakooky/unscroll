const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hashTag = new Schema({
    hash_id: {
        type: String,
        default: ''
    },
    img_name: {
        type: String,

    },
    hash_name: {
        type: String
    },
    user_id: {
        type: String
    }
});

var collectionName = 'hashTag'
const hash = mongoose.model('hashTag', hashTag);
module.exports = hash;