const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    nama:String,
    nohp:Number,
    email:String,
    password:String,
    persetujuan:String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
