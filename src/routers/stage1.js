const express = require('express')
const Stage1 = require('../models/stage1')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/stage1', auth, async (req, res) => {
    const stage1 = new Stage1({
        ...req.body,
        owner: req.entry._id
    })

    try {
        await stage1.save()
        res.status(201).send(stage1)
    } catch (e) {
        res.status(400).send(e)
    }
})
