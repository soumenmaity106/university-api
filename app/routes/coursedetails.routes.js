module.exports = function(app){
    var coursedetails = require('../controllers/coursedetails.controllers');

    //Create a New coursedetails
   // app.post('/api/coursedetails',coursedetails.create)

    //Retrieve all coursedetails
    app.get('/api/coursedetails',coursedetails.findAll)

    // Retrieve a single coursedetails by Id
    app.get('/api/coursedetails/:coursedetailsId', coursedetails.findOne);
}