const Placement = require('../models/placement.model');

//Post a CourseList
exports.create = (req,res) =>{
    //Create a CourseList 
    const placement = new Placement({
        year:req.body.year,
        placement_type:req.body.placement_type,
        program:req.body.program,
        department:req.body.department,
        placed:req.body.placed,
        highest_salary:req.body.highest_salary,
        median_salary:req.body.median_salary,
        averag_salary:req.body.averag_salary,
        comments:req.body.comments,
    })
    //Save CourseList in Mogodb
    placement.save()
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message
        })
    })
}

// FETCH all Placement
exports.findAll = (req,res)=>{
    Placement.find()
    .then(placements => {
        if(placements.length  <= 0){
            return  res.status(404).send({
                message:"Placements list Dtabase Empty "
            })
        }
        res.send({
            count: placements.length,
            Placements:placements
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

// FIND a Courselist
exports.findOne = (req, res) => {
    Placement.findById(req.params.placementId)
    .then(placement => {
        if(!placement) {
            return res.status(404).send({
                message: "Placement not found with id " + req.params.placementId
            });            
        }
        res.send(placement);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Placement not found with id " + req.params.placementId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Placement with id " + req.params.placementId
        });
    });
};