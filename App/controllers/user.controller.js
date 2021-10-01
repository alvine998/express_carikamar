const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');

// Create and Save a new Note
exports.create = (req, res) => {
    // Validate request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "Note content can not be empty"
    //     });
    // }

    // Create a User
    const user = new User({
        nama: req.body.nama, 
        nohp: req.body.nohp,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        persetujuan: req.body.persetujuan,
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

// User Login
exports.loginEmail = (req,res) => {
    User.findOne({email: req.body.email})
    .then(
        user => {
            if(!user){
                return res.status(404).send({
                    message: "Email Not Found"
                });
            } else {
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if(result == true){
                        res.status(200).send({Success: "Login Ok"})
                    } else {
                        res.status(500).send({Failed: "Email or Password Wrong"})
                    }
                })
            }
        }
    )
}

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    User.find()
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
    User.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.userId
        });
    });
};

// Find a single user with a userId
exports.findByEmail = (req, res) => {
    const emails = req.params.emailId
    User.findOne({'email': emails})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.emailId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.emailId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving User with id " + req.params.emailId
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        nama: req.body.nama, 
        nohp: req.body.nohp,
        email: req.body.email,
        password: req.body.password,
        persetujuan: req.body.persetujuan,
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating User with id " + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete User with id " + req.params.userId
        });
    });
};