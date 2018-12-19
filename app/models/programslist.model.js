const mongoose = require('mongoose');
const ProgramsListSchema = mongoose.Schema({
    sno: { type: Number, required: true },
    program: { type: String, required: true },
    department: { type: String, required: true },
})
module.exports = mongoose.model('ProgramsLists', ProgramsListSchema)