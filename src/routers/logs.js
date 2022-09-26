const express = require('express')
const Logs = require('../models/logs')
const auth = require('../middleware/auth')
const router = new express.Router()
router.use(auth)


router.get('/logs',async (req, res) =>{
    await Logs.find({}).then((logs) =>{
        res.send(logs)
    }).catch((e) =>{
        console.log(e)
    })
})

module.exports = router