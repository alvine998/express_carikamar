const Trans = require('../models/transaksi.model.js');
const bcrypt = require('bcryptjs');

// Create and Save a new Note
exports.create = async (req, res) => {
    // Validate request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Note content can not be empty"
    //     });
    // }

    // const generateRand = await Trans.aggregate(
    //     [
    //         {$set: {kode_pesanan: { $multiply: [{ $rand: {} }, 1000000000]}}},
    //         { $set: { kode_pesanan: { $floor: "$kode_pesanan"}}},
    //         { $merge: "Trans"}
    //     ]
    // )


    // Create a User
    const trans = new Trans({
        custid: req.body.custid,
        tanggal_checkin: req.body.tanggal_checkin,
        tanggal_checkout: req.body.tanggal_checkout,
        jumlah_malam: req.body.jumlah_malam,
        jumlah_tamu: req.body.jumlah_tamu,
        jumlah_kamar: req.body.jumlah_kamar,
        biaya: req.body.biaya,
        room: req.body.room,
        akomodasi: req.body.akomodasi,
        status_pembayaran: req.body.status_pembayaran,
        metode_pembayaran: '',
        images:''
    });

    // Save User in the database
    trans.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Transaksi."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Trans.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    Trans.findById(req.params.transId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Transaksi not found with id " + req.params.transId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Transaksi not found with id " + req.params.transId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Transaksi with id " + req.params.transId
        });
    });
};

// Find a single user with a userId
exports.findAllByCustid = (req, res) => {
    const custId = req.params.custId
    Trans.find({'custid': custId})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User Trans not found with id " + req.params.custId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.custId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.custId
        });
    });
};

// Find a single user with a userId
exports.findByCustid = (req, res) => {
    const custId = req.params.custId
    Trans.findOne({'custid': custId})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User Trans not found with id " + req.params.custId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.custId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.custId
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {

    // Find user and update it with the request body
    Trans.findByIdAndUpdate(req.params.transId, 
        req.body
    , {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.transId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.transId
            });                
        }
        return res.status(500).send({
            message: "Error updating User with id " + req.params.transId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    Trans.findByIdAndRemove(req.params.transId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.transId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.transId
            });                
        }
        return res.status(500).send({
            message: "Could not delete User with id " + req.params.transId
        });
    });
};
