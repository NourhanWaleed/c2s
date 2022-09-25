const mongoose = require('mongoose')
const Joi = require('joi')

const schemaText = Joi.object({

    Knob_Tube: Joi.boolean().required(),

    Abestos: Joi.boolean().required(),

    twelvex12: Joi.boolean().required(),

    Unvented_dryers: Joi.boolean().required(),

    Moisture_Concerns: Joi.boolean().required(),

    Blower_Door: Joi.boolean().required(),

    Blower_Door_Starting: Joi.number().required(),

    Notes: Joi.string(),

    Heating_system_pic: Joi.string().required(),

    Water_heater_pic: Joi.string().required(),
    
    Concerns_pic: Joi.string()  

})


const stage2Schema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    Knob_Tube: {
        type: Boolean,
        required: true
    },
    Abestos: {
        type: Boolean,
        required: true
    },
    twelvex12: {
        type: Boolean,
        required: true
    },
    Unvented_dryers: {
        type: Boolean,
        required: true
    },
    Moisture_Concerns:{
        type: Boolean,
        required: true
    },
    Blower_Door: {
        type: Boolean,
        required: true,
    },
    Blower_Door_Starting: {
        type: Number,
        required: true
    },
    Notes:{
        type: String
    },
    Heating_system_pic:{
        type: String,
        required: true
        
    },
    Water_heater_pic: {
        type: String,
        required: true
        
    },
    Concerns_pic: {
        type: String
    }
});

const Stage2 = mongoose.model('Stage2', stage2Schema)

module.exports = {Stage2, schemaText}