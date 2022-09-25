const mongoose = require('mongoose')
const Joi = require('joi')

const schemaText = Joi.object({

    Air_Sealing: Joi.boolean().required(),

    Top_plate: Joi.string().valid('YES', 'NO', 'NOT APPLICABLE').required(),

    Wet_Wall: Joi.string().valid('YES', 'NO', 'NOT APPLICABLE').required(),

    Chimney: Joi.string().valid('YES', 'NO', 'NOT APPLICABLE').required(),

    External_Top: Joi.string().valid('YES', 'NO', 'NOT APPLICABLE').required(),

    Bathroom_Fans: Joi.string().valid('YES', 'NO', 'NOT APPLICABLE').required(),

    Gable_Ends: Joi.string().valid('YES', 'NO', 'NOT APPLICABLE').required(),

    Attic_Access: Joi.string().valid('YES', 'NO', 'NOT APPLICABLE').required(),

    Basement_Sealed: Joi.string().valid('YES', 'NO', 'NOT APPLICABLE').required(),
    Notes: Joi.string(),
    Air_Sealing_pic: Joi.string().required()   

})

const stage3Schema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Entry'
    },
    Air_Sealing: {
        type: Boolean,
        required: true
    },
    Top_plate: {
        type: String,
        required: true
    },
    Wet_Wall: {
        type: String,
        required: true
    },
    Chimney: {
        type: String,
        required: true
    },
    External_Top:{
        type: String,
        required: true
    },
    Bathroom_Fans: {
        type: String,
        required: true,
    },
    Gable_Ends: {
        type: String,
        required: true
    },
    Attic_Access:{
        type: String,
        required: true
    },
    Basement_Sealed:{
        type: String,
        required: true
        
    },
    Notes: {
        type: String,
        
    },
    Air_Sealing_pic: {
        type: String, 
        required: true
    }
});

const Stage3 = mongoose.model('Stage3', stage3Schema)

module.exports = {Stage3, schemaText}