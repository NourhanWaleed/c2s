const mongoose = require('mongoose')
const Joi = require('joi')

const schemaText = Joi.object({

    Attic_Insulation: Joi.boolean().required(),

    Insulation_Markers: Joi.string().valid('YES', 'NO', 'NOT APPLICABLE').required(),

    Recessed_Lights: Joi.string().valid('YES', 'NO', 'NOT APPLICABLE').required(),

    Bathroom_Fans: Joi.string().valid('YES', 'NO', 'NOT APPLICABLE').required(),

    Measurements: Joi.string().valid('YES', 'NO', 'NOT APPLICABLE').required(),

    Venilation: Joi.string().valid('YES', 'NO', 'NOT APPLICABLE').required(),

    Chimney: Joi.string().valid('YES', 'NO', 'NOT APPLICABLE').required(),
    Measurements_Notes: Joi.string(),
    Attic_Insulation_Notes: Joi.string()

})
/*const heatSchema = Joi.object({  
    Attic_Insulation_Quality_pic: Joi.any().required()    
})
*/

const stage4Schema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    Attic_Insulation: {
        type: Boolean,
        required: true
    },
    Insulation_Markers: {
        type: String,
        required: true
    },
    Recessed_Lights: {
        type: String,
        required: true
    },
    Bathroom_Fans: {
        type: String,
        required: true
    },
    Measurements:{
        type: String,
        required: true
    },
    Venilation: {
        type: String,
        required: true,
    },
    Chimney: {
        type: String,
        required: true
    },
    Measurements_Notes: {
        type: String,
        
    },
        Attic_Insulation_Notes:{
            type:String
        }
    ,
    Attic_Insulation_Quality_pic: {
        type: Buffer
    }
});

const Stage4 = mongoose.model('Stage4', stage4Schema)

module.exports = {Stage4, schemaText}