var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 3000
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
require('./app/routes/centers.routes')(app);
require('./app/routes/facilitis.routes')(app);
require('./app/routes/facultyprofile.routes')(app);
require('./app/routes/hiringcompanise.routes')(app);
require('./app/routes/coursedetails.routes')(app);
require('./app/routes/adminlogin.routes')(app)
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
 app.listen(port,()=>{
     console.log(`Server is Start ${port}`)
 })