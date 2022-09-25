const mongoose = require('mongoose')
const Joi = require('joi')

const schemaText = Joi.object({

    Wall_Insulation: Joi.boolean().required(),

    Wall_Measurements: Joi.boolean().required(),

    Drainage_Plane: Joi.boolean().required(),

    Siding_put: Joi.boolean().required(),

    Corner_braces: Joi.boolean().required(),

    Blockers: Joi.boolean().required(),
    Measurements_Notes: Joi.string(),
  

})

const stage5Schema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Entry'
    },
    Wall_Insulation: {
        type: Boolean,
        required: true
    },
    Wall_Measurements: {
        type: Boolean,
        required: true
    },
    Drainage_Plane: {
        type: Boolean,
        required: true
    },
    Siding_put: {
        type: Boolean,
        required: true
    },
    Corner_braces:{
        type: Boolean,
        required: true
    },
    Blockers: {
        type: Boolean,
        required: true,
    },
    Measurements_Notes: {
        type: String,
        
    }
});

const Stage5 = mongoose.model('Stage5', stage5Schema)

module.exports = {Stage5, schemaText}