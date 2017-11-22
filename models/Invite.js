const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Invite = Schema({
    invite_id: {
        type: String,
        default: ''
    },
    user_id: {
        type: String
    },
    img_id: {
        type: String
    },
    invited_on: {
        type: Date,
        default: Date.now
    }

});

var collectionName = 'img_invitation';

const img_invitation = mongoose.model('img_invitation', Invite);
module.exports = img_invitation;