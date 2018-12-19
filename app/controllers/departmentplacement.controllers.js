const Departmentplacement = require('../models/departmentplacement.model');

//Post a Departmentplacement
exports.create = (req,res) =>{
    //Create a Departmentplacement 
    const departmentplacement = new Departmentplacement({
        year:req.body.year,
        placement_type:req.body.placement_type,
        program:req.body.program,
        comments:req.body.comments,
    })
    //Save Departmentplacement in Mogodb
    departmentplacement.save()
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message
        })
    })
}

// FETCH all departmentplacement
exports.findAll = (req,res)=>{
    Departmentplacement.find()
    .then(departmentplacement => {
        if(departmentplacement.length  <= 0){
            return  res.status(404).send({
                message:"Departmentplacement list Dtabase Empty "
            })
        }
        res.send({
            count: departmentplacement.length,
            Departmentplacements:departmentplacement
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

//FIND a Departmentplacement
exports.findOne = (req, res) => {
    Departmentplacement.findById(req.params.departmentplacementId)
    .then(departmentplacement => {
        if(!departmentplacement) {
            return res.status(404).send({
                message: "Departmentplacement not found with id " + req.params.departmentplacementId
            });            
        }
        res.send(departmentplacement);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Departmentplacement not found with id " + req.params.departmentplacementId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Departmentplacement with id " + req.params.departmentplacementId
        });
    });
};