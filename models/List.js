const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const cateSchema = Schema({
    _id: ObjectId,
    cat_name: String
})

const ImgScema = Schema({
    _id: ObjectId,
    i
})