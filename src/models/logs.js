const mongoose = require('mongoose')

const logsSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    data: {
        type: String
    }
})



const Logs = mongoose.model('Logs', logsSchema)
module.exports = Logs

