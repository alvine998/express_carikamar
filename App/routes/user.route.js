module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new user
    app.post('/users', users.create);

    // Login with email
    app.post('/login/users', users.loginEmail)

    // Retrieve all users
    app.get('/users', users.findAll);

    // Retrieve a single user with userId
    app.get('/users/:userId', users.findOne);

    // Retrieve a single user with userId
    app.get('/users/mail/:emailId', users.findByEmail);

    // Update a user with userId
    app.put('/users/:userId', users.update);

    // Delete a user with userId
    app.delete('/users/:userId', users.delete);
}