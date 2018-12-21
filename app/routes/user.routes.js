module.exports = function(app){
    var users = require('../controllers/user.controllers');

    //Create a New User
    app.post('/api/signup',users.create)

    
    //Login
    app.post('/api/login',users.login)

    //Retrieve all CourseLists
   //app.get('/api/courselists',courselist.findAll)

    // Retrieve a single CourseLists by Id
    //app.get('/api/courselists/:courselistId', courselist.findOne);
}