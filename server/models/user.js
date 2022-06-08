const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	userName: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    },
    password: {
        type : String,
        required : true
    },
    phone: {
        type : String,
        required : true
    },
    dob: {
        type : Date,
        // required : true
    },
    tob: {
        type : Date,
        // required : true
    },
    gender: {
        type : Number, // 0 - not disclose  1 - male  2 - female
        required : true
    },
    maritialStatus: {
        type : Number, // 0 - Single  1 - Unmarried  2 - Married
        required : true
    },
    language: {
        type : Number, // 1 - Hindle  2 - English
        required : true
    },
    profilePic: {
        type : String,
        // required : true
    },
    createdAt : {
        type : Date,
        default : new Date()
    }
});

userSchema.index({ userName : 1 }, { unique: true })
userSchema.index({ email : 1 }, { unique: true })

module.exports = mongoose.model('Users', userSchema);
