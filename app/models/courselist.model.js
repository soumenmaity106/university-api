const mongoose = require('mongoose');
const CourseListSchema = mongoose.Schema({
    sno: { type: Number, required: true },
    program: { type: String, required: true },
    department: { type: String, required: true },
    courseid: { type: Number, required: true },
    coursename:{ type: String, required: true },
})
module.exports = mongoose.model('CourseLists', CourseListSchema)