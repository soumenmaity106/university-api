const CourseDetails = require('../models/coursedetails.model');

//Post a CourseDetails
exports.create = (req,res) =>{
    //Create a CourseDetails 
    const coursedetails = new CourseDetails({
        course_id:req.body.course_id,
        course_name:req.body.course_name,
        course_fees:req.body.course_fees,
        faculty_name:req.body.faculty_name,
        credits:req.body.credits,
        prequisites:req.body.prequisites,
    })
    //Save CourseDetails in Mogodb
    coursedetails.save()
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message
        })
    })
}

// FETCH all CourseDetails
exports.findAll = (req,res)=>{
    CourseDetails.find()
    .then(coursedetails => {
        if(coursedetails.length  <= 0){
            return  res.status(404).send({
                message:"Centers list Dtabase Empty "
            })
        }
        res.send({
            count:coursedetails.length,
            CourseDetails:coursedetails
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

//FIND a CourseDetails
exports.findOne = (req, res) => {
    CourseDetails.findById(req.params.coursedetailsId)
    .then(coursedetails => {
        if(!coursedetails) {
            return res.status(404).send({
                message: "Coursedetails not found with id " + req.params.coursedetailsId
            });            
        }
        res.send(coursedetails);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Coursedetails not found with id " + req.params.coursedetailsId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Coursedetails with id " + req.params.coursedetailsId
        });
    });
};