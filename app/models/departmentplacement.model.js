const mongoose = require('mongoose');
const DepartmentPlacementSchema = mongoose.Schema({
    year: { type: Number, required: true },
    placement_type: { type: String, required: true },
    program:{ type: String, required: true },
    comments: { type: String,required:true },
})
module.exports = mongoose.model('DepartmentPlacements', DepartmentPlacementSchema)