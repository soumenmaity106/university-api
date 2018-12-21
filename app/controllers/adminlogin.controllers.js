const AdminLogin = require('../models/adminlogin.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Post a signup
exports.create = (req,res) =>{
    AdminLogin.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length >=1 ){
            return res.status(409).send({
                message:"Mail exists"
            })
        }else{
            //Create User
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                    return res.status(500).send({
                        error:err
                    })
                }
                else{
                   const user = new AdminLogin({
                       email:req.body.email,
                       password:hash
                   }) 
                   user.save()
                   .then(data=>{
                       res.send(data)
                   })
                   .catch(err=>{
                       res.status(500).send({
                           error:err.error
                       })
                   })
                }
            })
        }
    })
   
}
//Admin Login
exports.login = (req,res)=>{
    AdminLogin.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length < 1){
            return res.status(401).send({
                message:"Auth Failed"
            })
        }
    bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
        if(err){
            return res.status(401).send({
                message:"Auth Failed"
            })
        }
        if(result){
            const token = jwt.sign(
                {
                    email:user[0].email,
                    userId:user[0]._id
                },
                'hhhhs',
                {
                    expiresIn: "1h"
                }
                );
            return res.status(200).send({
                message:"Auth Successful",
                token:token
            })
        }
    })
    })
    .catch() 
}
// FETCH all Centers
// exports.findAll = (req,res)=>{
//     Centers.find()
//     .then(centers => {
//         if(centers.length  <= 0){
//             return  res.status(404).send({
//                 message:"Centers list Dtabase Empty "
//             })
//         }
//         res.send({
//             count: centers.length,
//             Centers:centers
//         });
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message
//         });
//     });
// }

// FIND a Centers
// exports.findOne = (req, res) => {
//     Centers.findById(req.params.centersId)
//     .then(centers => {
//         if(!centers) {
//             return res.status(404).send({
//                 message: "Centers not found with id " + req.params.centersId
//             });            
//         }
//         res.send(centers);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Centers not found with id " + req.params.centersId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving centers with id " + req.params.centersId
//         });
//     });
// };