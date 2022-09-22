const mongoose = require('mongoose')
const Joi = require('joi')

const schema = Joi.object({
    programType: Joi.string()
    .valid('CLEAResult', 'RISE', 'Self Help', 'Citizens for Citizens (CFC)')
    .required(),

    CrewCheif: Joi.string().required(),

    Date_Time: Joi.date().required(),

    Address_Line1: Joi.string().required(),

    City: Joi.string().required(),

    JobID: Joi.string().required()
})
const stage1Schema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    programType: {
        type: String,
        required: true
    },
    CrewCheif: {
        type: String,
        required: true
    },
    Date_Time: {
        type: Date,
        required: true
    },
    Address_Line1: {
        type: String,
        required: true
    },
    City:{
        type: String,
        required: true
    },
    JobID: {
        type: String,
        required: true,
        unique: true
    }
});

const Stage1 = mongoose.model('Stage1', stage1Schema)

module.exports = {Stage1, schema}