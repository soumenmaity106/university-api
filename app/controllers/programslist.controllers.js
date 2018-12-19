const ProgramsList = require('../models/programslist.model');

//Post a ProgramsList
exports.create = (req,res) =>{
    //Create a ProgramsList 
    const programlist = new ProgramsList({
        sno:req.body.sno,
        program:req.body.program,
        department:req.body.department      
    })
    //Save ProgramsList in Mogodb
    programlist.save()
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message
        })
    })
}

// FETCH all ProgramsLis
exports.findAll = (req,res)=>{
    ProgramsList.find()
    .then(programlists => {
        if(programlists.length  <= 0){
            return  res.status(404).send({
                message:"ProgramLists Dtabase Empty "
            })
        }
        res.send({
            count: programlists.length,
            ProgramsList:programlists
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
}

// FIND a ProgramsList
exports.findOne = (req, res) => {
    ProgramsList.findById(req.params.programslistId)
    .then(programslist => {
        if(!programslist) {
            return res.status(404).send({
                message: "Programslist not found with id " + req.params.programslistId
            });            
        }
        res.send(programslist);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Programslist not found with id " + req.params.programslistId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Programslist with id " + req.params.programslistId
        });
    });
};