const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
	firstName: {
        type : String
    },
    lastName: {
        type : String
    }
},
{
    timestamps : true
});

module.exports = mongoose.model('Authors', authorSchema);
