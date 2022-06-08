const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
	name: {
        type : String
    }
},
{
    timestamps : true
});

module.exports = mongoose.model('category', categorySchema);
