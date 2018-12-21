const mongoose = require('mongoose');
const CentersSchema = mongoose.Schema({
    branch_name: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    zip_code: { type: String, required: true },
})
module.exports = mongoose.model('Centers', CentersSchema)