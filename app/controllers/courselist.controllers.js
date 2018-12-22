const CourseList = require('../models/courselist.model');

//Post a CourseList
exports.create = (req, res) => {
    //Create a CourseList 
    const courselist = new CourseList({
        sno: req.body.sno,
        program: req.body.program,
        department: req.body.department,
        courseid: req.body.courseid,
        coursename: req.body.coursename
    })
    //Save CourseList in Mogodb
    courselist.save()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}

// FETCH all CourseList
exports.findAll = (req, res) => {
    CourseList.find()
        .then(courselists => {
            if (courselists.length <= 0) {
                return res.status(404).send({
                    message: "Course list Dtabase Empty "
                })
            }
            res.send({
                count: courselists.length,
                Courselists: courselists
            });
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        });
}

// FIND a Courselist
exports.findOne = (req, res) => {
    CourseList.findById(req.params.courselistId)
        .then(courselist => {
            if (!courselist) {
                return res.status(404).send({
                    message: "Courselist not found with id " + req.params.courselistId
                });
            }
            res.send(courselist);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Courselist not found with id " + req.params.courselistId
                });
            }
            return res.status(500).send({
                message: "Error retrieving Courselist with id " + req.params.courselistId
            });
        });
};

//Update Courselist
exports.update = (req, res) => {
    //Find Course Id and update it
    CourseList.findByIdAndUpdate(req.params.courselistId,
        {
            sno: req.body.sno,
            program: req.body.program,
            department: req.body.department,
            courseid: req.body.courseid,
            coursename: req.body.coursename
        },
        { new: true })
        .then(courselist => {
            if (!courselist) {
                return res.status(404).send({
                    message: "CourseList not found by Id " + req.params.courselistId
                });
            }
            res.send(courselist)
        })
        .catch(err => {
            if (err.kind === 'ObjectID') {
                return res.status(404).send({
                    message: "CourseList not found by Id" + req.params.courselistId
                })
            }
            return res.status(5000).send({
                message: "Error updating CourseList by Id" + req.params.courselistId
            })
        })
}

//Couselist Delete by ID
exports.delete = (req, res) => {
    CourseList.findByIdAndRemove(req.params.courselistId)
        .then(courselist => {
            if (!courselist) {
                return res.status(404).send({
                    message: "CourseList not found by Id" + req.params.courselistId
                });
            }
            res.send({ message: "CourseList deleted successfully!" });
        })
        .catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "CourseList not found with id " + req.params.courselistId
                });
            }
            return res.status(500).send({
                message: "CourseList not delete customer with id " + req.params.courselistId
            });
        });
}
