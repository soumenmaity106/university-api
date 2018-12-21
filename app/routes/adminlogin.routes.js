module.exports = function(app){
    var adminlogin = require('../controllers/adminlogin.controllers');

    //Create a New admin
    app.post('/api/signup',adminlogin.create)

    //Create a Login
    app.post('/api/login',adminlogin.login)


    //Retrieve all centers
   //app.get('/api/centers',centers.findAll)

    // Retrieve a single centers by Id
    //app.get('/api/centers/:centersId', centers.findOne);
}