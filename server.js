const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

// Configuring the database
const dbConfig = require('./config/db.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

global.__basedir = __dirname;

// Require Notes routes
require('./App/routes/note.route.js')(app);
require('./App/routes/user.route.js')(app);
require('./App/routes/transaksi.routes')(app);
require('./App/routes/images.routes')(app);

// express to access file statics
const dirname = path.resolve();
app.use("/resources/uploads/", express.static(path.join(dirname, "/resources/uploads/")));

// listen for requests
const server = app.listen(process.env.PORT || 4000, () => {
    const port = server.address().port;
    console.log(`express is working on port ${port}`);
})
