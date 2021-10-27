const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;

const InvoiceSchema = mongoose.Schema({
    kode_pesanan: {type:ObjectId, ref:'transaksi.model'},
    tanggal:String,
    room:String,
    akomodasi:String,
    biaya:Number,
    ppn:Number,
    diskon:Number
}, {
    timestamps: true
});

module.exports = mongoose.model('User', InvoiceSchema);
