const Centers = require('../models/centers.model');

//Post a Centers
exports.create = (req,res) =>{
    //Create a Centers 
    const centers = new Centers({
        branch_name:req.body.branch_name,
        address:req.body.address,
        location:req.body.location,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
        zip_code:req.body.zip_code       
    })
    //Save Centers in Mogodb
    centers.save()
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message
        })
    })
}

// FETCH all Centers
exports.findAll = (req,res)=>{
    Centers.find()
    .then(centers => {
        if(centers.length  <= 0){
            return  res.status(404).send({
                message:"Centers list Dtabase Empty "
            })
        }
        res.send({
            count: centers.length,
            Centers:centers
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

// FIND a Centers
exports.findOne = (req, res) => {
    Centers.findById(req.params.centersId)
    .then(centers => {
        if(!centers) {
            return res.status(404).send({
                message: "Centers not found with id " + req.params.centersId
            });            
        }
        res.send(centers);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Centers not found with id " + req.params.centersId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving centers with id " + req.params.centersId
        });
    });
};