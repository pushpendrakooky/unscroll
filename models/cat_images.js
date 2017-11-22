const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cat_image = new Schema({
    cat_id: {
        type: String,
        default: ''
    },
    img_name: {
        type: String,
    },
    img_url: {
        type: Array
    }

});

var collectionName = 'cat_image';
const cat_img = mongoose.model('cat_image', cat_image);

module.exports = cat_img;