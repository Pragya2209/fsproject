const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
	heading: {
        type : String
    },
    createdAt: {
        type : Date,
        default : new Date(),
        index : true
    },
    content : {
        type : String
    },
    authorId : {
       type : mongoose.Schema.ObjectId
    },
    thumbnail : {
       type : String
    },
    categoryId : {
        type :  mongoose.Schema.ObjectId
    }
});

articleSchema.index({ heading : 1 })

module.exports = mongoose.model('Articles', articleSchema);
