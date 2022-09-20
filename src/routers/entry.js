const express = require('express')
const Entry = require('../models/entry')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/entry', auth, async (req, res) => {
    const entry = new Entry({
        ...req.body,
        owner: req.user._id
    })

    try {
        await entry.save()
        res.status(201).send(entry)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router