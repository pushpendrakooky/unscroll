const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_id: {
        type: String,
        default: ''
    },
    user_name: {
        type: String,
        // required: [true, 'Name Field Is Required']
    },
    userEmail: {
        type: String,
        // required: [true, 'Email Id Is Required']
    },
    selectedCategory: {
        type: Boolean,
        default: false
    },
    fullName: {
        type: String,
        default: ''
    },
    userPassword: {
        type: String,
    },
    totalInvite: {
        type: Number,
        default: 0
    },
    profileImg: {
        type: String,
        default: ''
    },
    lastView: {
        type: Number,
        default: 0
    },
    fbId: {
        type: String,
        default: ''
    },
    gPlusId: {
        type: String,
        default: ''
    },
    otp: {
        type: Number,
        default: 0
    },
    isOtpVerify: {
        type: Boolean,
        default: 0

    },
    accountStatus: {
        type: Boolean,
        default: true
    }

});

const User = mongoose.model('user', userSchema);

module.exports = User;