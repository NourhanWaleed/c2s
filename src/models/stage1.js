const mongoose = require('mongoose')

const stage1Schema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Entry'
    }
},{
    programType: {
        type: String,
        required: true
    }
}, {
    CrewCheif: {
        type: String,
        required: true
    }
},{
    Date_Time: {
        type: Date,
        required: true
    }
}, {
    Address_Line1: {
        type: String,
        required: true
    }
},{
    City:{
        type: String,
        required: true
    }
},{
    JobID: {
        type: String,
        required: true
    }
},
)

const Stage1 = mongoose.model('Stage1', stage1Schema)

module.exports = Stage1