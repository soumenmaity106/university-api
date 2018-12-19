module.exports = function(app){
    var courselist = require('../controllers/courselist.controllers');

    //Create a New Courselist
    app.post('/api/courselists',courselist.create)

    //Retrieve all CourseLists
   app.get('/api/courselists',courselist.findAll)

    // Retrieve a single CourseLists by Id
    app.get('/api/courselists/:courselistId', courselist.findOne);
}