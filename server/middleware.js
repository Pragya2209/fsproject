const commonFunction = require('./common');
const moment = require('moment');
const multer = require('multer');
const path = require('path');

const checkValidators = (req, res, next) => {
    let missingKey = commonFunction.checkKey(['username', 'email', 'phone', 'password',  'gender', 'maritialStatus', 'language', ], req.body)
    if (missingKey) {
        res.status(404).send({message : `${missingKey} is missing`});
    }
    
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email)) {
        res.status(400).send({message : 'Invalid email'});
    }
    
    if (!(req.body.phone.length >= 10 && req.body.phone.length <= 11) || !/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(req.body.phone)) {
        res.status(400).send({message : 'Invalid Phone Number'});
    }
    
    if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/.test(req.body.password) || req.body.password.length < 8) {
        res.status(400).send({message : 'Password should be at least one capital and one small letter, one number and one special character with minimum 8 letters'})
    }

    // if (!moment(req.body.dob).isValid()) {
    //     res.status(400).send({message : 'Invalid dob'})
    // }

    // if (!moment(req.body.tob, 'hh:mm a').isValid()) {
    //     res.status(400).send({message : 'Invalid tob'})
    // }

    if (![0,1,2].includes(req.body.gender)) {
        res.status(400).send({message : 'Invalid gender'})
    }

    if (![0,1,2].includes(req.body.maritialStatus)) {
        res.status(400).send({message : 'Invalid maritialStatus'})
    }

    if (![1,2].includes(req.body.language)) {
        res.status(400).send({message : 'Invalid language'})
    }

    next();
}

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
       cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
 });

 var upload = multer({ storage: storage });

module.exports = {
    checkValidators,
    upload
}