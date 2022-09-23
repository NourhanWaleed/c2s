const mongoose = require('mongoose')
const Stage1 = require('./stage1')
const entrySchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    completed: {
        type: String
        
    }
}
,{
    timestamps: true
})

entrySchema.virtual('stage1', {
    ref: 'Stage1',
    localField: '_id',
    foreignField: 'entry'
})

const Entry = mongoose.model('Entry', entrySchema)

module.exports = Entry