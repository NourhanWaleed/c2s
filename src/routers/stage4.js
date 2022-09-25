const express = require('express')
const {Stage4, schemaText} = require('../models/stage4')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')
router.use(auth)

//create stage4
router.post('/stage4', async (req, res) => {
    try {
        const value = await schemaText.validateAsync(req.body);
        const obj = {
            owner: req.user._id,
            ...req.body
        };
        console.log(obj);
        const stage4 = new Stage4(obj);

        await stage4.save();
        res.status(201).send(stage4)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})


//read stage4
router.get('/stage4',async (req, res) =>{
    await Stage4.find({}).then((stage4) =>{
        res.send(stage4)
    }).catch((e) =>{
        console.log(e)
    })
})

router.get('/stage4/:id', async (req, res) => {
    const _id = req.params.id
    await Stage4.findById(_id).then((stage4) =>{
        if(!stage4){
            return res.status(404).send()
        }
        res.send(stage4)
    }).catch((e) =>{
        res.status(500).send()
    })
})

//edit stage4
router.patch('/stage4/:id', async(req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['Attic_Insulation', 'Insulation_Markers', 'Recessed_Lights', 'Bathroom_Fans', 'Measurements', 'Venilation', 'Chimney','Measurements_Notes','Attic_Insulation_Notes', 'Attic_Insulation_Quality_pic']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try {
        const stage4 = await Stage4.findById(req.params.id)
       updates.forEach((update) => stage4[update] = req.body[update])
       await stage4.save()
        if(!stage4){
            return res.status(400).send()
        }
        res.send(stage4)
    }catch(e){
        res.status(400).send(e)
    }
})

//delete stage
router.delete('/stage4/:id', async(req, res) => {
    try{
        const stage4 = await Stage4.findByIdAndDelete(req.params.id)
            if(!stage4){
                return res.status(404).send()
            }
            res.send(stage4)
    } catch (e) {
res.status(500).send()
    }
})


module.exports = router