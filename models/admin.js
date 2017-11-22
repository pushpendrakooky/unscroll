const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    admin_name: {
        type: String
    },
    password: {
        type: String
    }
});

var collectionName = 'myadmin'
const AdminModel = mongoose.model('myadmin', adminSchema);
module.exports = AdminModel;