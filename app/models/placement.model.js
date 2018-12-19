const mongoose = require('mongoose');
const PlacementSchema = mongoose.Schema({
    year: { type: Number, required: true },
    placement_type: { type: String, required: true },
    program:{ type: String, required: true },
    department: { type: String, required: true },    
    placed: { type: String, required: true },
    highest_salary: { type: String, required: true },
    median_salary: { type: String, required: true },
    averag_salary: { type: String, required: true },
    comments: { type: String, },
})
module.exports = mongoose.model('Placements', PlacementSchema)