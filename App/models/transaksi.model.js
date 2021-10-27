const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const TransSchema = mongoose.Schema({
    custid: {type:ObjectId, ref:'user.model'},
    tanggal_checkin: String,
    tanggal_checkout: String,
    jumlah_malam: Number,
    jumlah_tamu: Number,
    jumlah_kamar:Number,
    biaya: Number,
    room: String,
    akomodasi: String,
    status_pembayaran:String,
    metode_pembayaran:String,
    images:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaksi', TransSchema);
