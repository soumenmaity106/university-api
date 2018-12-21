const mongoose = require('mongoose');
const CourseDetailsSchema = mongoose.Schema({
    course_id: { type: String, required: true },
    course_name: { type: String, required: true },
    course_fees: { type: String, required: true },
    faculty_name: { type: String, required: true },
    credits: { type: String, required: true },
    prequisites: [String]
})
module.exports = mongoose.model('CourseDetails', CourseDetailsSchema);