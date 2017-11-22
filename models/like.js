const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LikeScheme = Schema({
    like_id: {
        type: String,
        default: ''
    },
    user_id: {
        type: String
    },
    img_id: {
        type: String
    },
    Likeed_on: {
        type: Date,
        default: Date.now
    }
    //    stories: [{ type: Schema.Types.ObjectId, ref: 'img' }]

});

var ImageSchema = new Schema({
    image_id: [{ type: Schema.Types.ObjectId, ref: 'img_like' }],
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

var collectionName = 'img_like';

const img_like = mongoose.model('img_like', LikeScheme);
const img = mongoose.model('img', LikeScheme);
module.exports = img_like;