const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Post a User
exports.create = (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).send({
                    message: "Mail exists"
                })
            } else {
                //Create a User 
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).send({
                            error: err
                        })
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash
                        })
                        //Save User in Mogodb
                        user.save()
                            .then(data => {
                                res.send(data)
                            })
                            .catch(err => {
                                res.status(500).send({
                                    message: err.message
                                })
                            })
                    }
                })
            }
        })
}
//Login

exports.login = (req,res) =>{
    User.find({email:req.body.email})
    .exec()
    .then(user =>{
        if(user.length < 1){
            return res.status(401).send({
                message:"Auth failed"
            })
        }
        bcrypt.compare(req.body.password, user[0].password,(err,result)=>{
            if(err){
                return res.status(401).send({
                    message:"Auth failed"
                }) 
            }
            if(result){
               const token = jwt.sign({
                    email:user[0].email,
                    userId:user[0]._id
                },
                'cert',
                {
                    expiresIn:"1h"
                });
                return res.status(200).send({
                    message:"Auth Sucessful",
                    token:token
                })
            }
            return res.status(401).send({
                message:"Auth failed"
            }) 
        })
    })
    .catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

// FETCH all CourseList
// exports.findAll = (req,res)=>{
//     CourseList.find()
//     .then(courselists => {
//         if(courselists.length  <= 0){
//             return  res.status(404).send({
//                 message:"Course list Dtabase Empty "
//             })
//         }
//         res.send({
//             count: courselists.length,
//             Courselists:courselists
//         });
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message
//         });
//     });
// }

// FIND a Courselist
// exports.findOne = (req, res) => {
//     CourseList.findById(req.params.courselistId)
//     .then(courselist => {
//         if(!courselist) {
//             return res.status(404).send({
//                 message: "Courselist not found with id " + req.params.courselistId
//             });            
//         }
//         res.send(courselist);
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Courselist not found with id " + req.params.courselistId
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving Courselist with id " + req.params.courselistId
//         });
//     });
// };