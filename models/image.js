const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    image_id: {
        type: String,
        default: '',
        ref: 'img_id'
    },
    user_id: {
        type: String,
        required: [true, "User Id Missing"]
    },
    img: {
        type: String,
        require: [true, "Upload Image"]
    },
    thumb_image: {
        type: String
    },
    img_url: {
        type: String,
        default: ''
    },
    thumb_url: {
        type: String,
        default: ''
    },

    category: {
        type: String
    },
    downloads: {
        type: Number,
        default: 0
    },
    share: {
        type: Number,
        default: 0
    },
    img_addedOn: {
        type: Date,
        default: Date.now
    },
    img_like: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        default: ''
    },
    iLike: {
        type: Boolean,
        default: false
    }

});
var collectionName = 'image'
const Image = mongoose.model('Image', ImageSchema);
module.exports = Image;