const mongoose = require('mongoose')
const Joi = require('joi')

const schemaText = Joi.object({

    Air_Sealing: Joi.string().valid('YES', 'NO', 'N/A').required(),

    Zonal_Pressure: Joi.string().valid('YES', 'NO', 'N/A').required(),

    Accu_Vents: Joi.string().valid('YES', 'NO', 'N/A').required(),

    Finished_Attic: Joi.string().valid('YES', 'NO', 'N/A').required(),

    Certificateof_Insulation: Joi.string().valid('YES', 'NO', 'N/A').required(),

    General_Quality_Pictures: Joi.string().valid('YES', 'NO', 'N/A').required(),
    Pics: Joi.string().required(),
    Final_Notes: Joi.string(),
    Blower_Door: Joi.string().required(),
    Nothing_left_behind: Joi.boolean().required(),
    Fan_working: Joi.boolean().required(),
    Misc_Images: Joi.string().required(),
    Positive_review: Joi.string().valid('Not sure', 'Yes', 'No').required()
})


const stage6Schema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    Air_Sealing: {
        type: String,
        required: true
    },
    Zonal_Pressure: {
        type: String,
        required: true
    },
    Accu_Vents: {
        type: String,
        required: true
    },
    Finished_Attic: {
        type: String,
        required: true
    },
    Certificateof_Insulation:{
        type: String,
        required: true
    },
    General_Quality_Pictures: {
        type: String,
        required: true,
    },
    Pics:{
        type: String,
        required: true
    },
    Final_Notes: {
        type: String,
        
    },
    Blower_Door:{
        type:String,
        required: true
    }
    ,
    Nothing_left_behind: {
        type: Boolean,
        required: true
    },
    Fan_working: {
        type:Boolean,
        required: true
    },
    Misc_Images :{
        type: String,
        required: true
    },
    Positive_review: {
        type: String,
        required: true
    }

});

const Stage6 = mongoose.model('Stage6', stage6Schema)

module.exports = {Stage6, schemaText}