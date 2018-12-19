const mongoose = require('mongoose');
const RegistrationSchema = mongoose.Schema({
    coursename: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, required: true },
    zipcode:{ type: String, required: true },
    dob:{ type: String, required: true },
    qualifications:{ type: String, required: true },
    phone:{ type: Number, required: true },
    email:{ type: String, required: true },
    confirmationid:{ type: String},
})
module.exports = mongoose.model('Registrations', RegistrationSchema)