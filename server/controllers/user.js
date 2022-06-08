const bcrypt = require("bcrypt");
const sanitize = require("mongo-sanitize");
const moment = require('moment');

const User = require('../models/user');

const updateUser = async (req, res, next) => {
    try {  
        console.log('===============')
         
        let bycryptSalt = await bcrypt.genSalt(Number(process.env.ROUNDS))
        let hashPassword = await bcrypt.hash(req.body.password, bycryptSalt)

        const userData = {
            userName: sanitize(req.body.username),
            email: sanitize(req.body.email),
            phone: sanitize(req.body.phone),
            password: sanitize(hashPassword),
            // dob: sanitize(moment(req.body.dob)),
            // tob: sanitize(moment(req.body.tob, 'hh:mm a')),
            gender : sanitize(req.body.gender),
            maritialStatus : sanitize(req.body.maritialStatus),
            language : sanitize(req.body.language),
            profilePic : sanitize(req.body.profilePic),
        };

        await User.updateOne({email : userData.email}, {$set : userData}, {$upsert : true})
        res.status(200).send({message : 'User Profile Updated Successfully'})
    }
    catch (err) {
        console.log (err)
        res.status(500).send({message : 'Some error occured'});
    }
};

const getUser = async (req, res) => {
    try {
        let data = await User.findOne({userName : req.params.userName})
        if (data) {
            res.status(200).send({message : 'User Profile found Successfully', response : data})   
        }
        else {
            res.status(200).send({message : 'User Profile not found', response : {}})   
        }
    }
    catch (err) {
        res.status(500).send({message : 'Some error occured'});
    }
}

const uploadImg =  (req, res, next) => {
    const file = req.file;
    if (!file) {
       return res.status(400).send({ message: 'Please upload a file.' });
    }
    return res.send({ message: 'File uploaded successfully.', file });
}

module.exports = {
  updateUser,
  getUser,
  uploadImg
};
