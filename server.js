var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./app/config/mongodb.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to MongoDB.");    
}).catch(err => {
    console.log('Could not connect to MongoDB.');
    process.exit();
});

//Route 
require('./app/routes/customer.routes.js')(app);
require('./app/routes/registration.routes')(app);
require('./app/routes/courselist.routes')(app);
require('./app/routes/programslist.routes')(app);
require('./app/routes/placement.routes')(app);
require('./app/routes/departmentplacement.routes')(app);
//Error route
app.use((req, res, next) => {
    const error = new Error('Page Not Found');
    res.status(404);
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })

})

// Create a Server
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("App listening at http://%s:%s", host, port)

})