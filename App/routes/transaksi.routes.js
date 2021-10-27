module.exports = (app) => {
    const trans = require('../controllers/transaksi.controller');

    // Create a new Note
    app.post('/trans', trans.create);

    // Retrieve all Notes
    app.get('/trans', trans.findAll);

    // Retrieve a single Note with noteId
    app.get('/trans/:transId', trans.findOne);
    app.get('/trans/id/:custId', trans.findByCustid);
    app.get('/trans/custid/:custId', trans.findAllByCustid);


    // Update a Note with noteId
    app.put('/trans/:transId', trans.update);

    // Delete a Note with noteId
    app.delete('/trans/:transId', trans.delete);
}