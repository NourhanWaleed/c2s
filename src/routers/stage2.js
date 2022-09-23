const express = require('express')
const {Stage2, schemaText, heatSchema, waterSchema} = require('../models/stage2')
const auth = require('../middleware/auth')
const router = new express.Router()
const multer = require('multer')
const sharp = require('sharp')
router.use(auth)

//create stage2
router.post('/stage2', async (req, res) => {
    try {
        const value = await schemaText.validateAsync(req.body);
        const obj = {
            owner: req.user._id,
            ...req.body
        };
        console.log(obj);
        const stage2 = new Stage2(obj);

        await stage2.save();
        res.status(201).send(stage2)
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
/*router.post('/stage2/heat', auth, upload.single('heat'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})*/

//read stage2
router.get('/stage2',async (req, res) =>{
    await Stage2.find({}).then((stage2) =>{
        res.send(stage2)
    }).catch((e) =>{
        console.log(e)
    })
})

router.get('/stage2/:id', async (req, res) => {
    const _id = req.params.id
    await Stage2.findById(_id).then((stage2) =>{
        if(!stage2){
            return res.status(404).send()
        }
        res.send(stage2)
    }).catch((e) =>{
        res.status(500).send()
    })
})

//edit stage2
router.patch('/stage2/:id', async(req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['Knob_Tube', 'Abestos', 'twelvex12', 'Unvented_dryers', 'Moisture_Concerns', 'Blower_Door', 'Blower_Door_Starting', 'Notes']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try {
        const stage2 = await Stage2.findById(req.params.id)
       updates.forEach((update) => stage2[update] = req.body[update])
       await stage2.save()
        if(!stage2){
            return res.status(400).send()
        }
        res.send(stage2)
    }catch(e){
        res.status(400).send(e)
    }
})

//delete stage
router.delete('/stage2/:id', async(req, res) => {
    try{
        const stage2 = await Stage2.findByIdAndDelete(req.params.id)
            if(!stage2){
                return res.status(404).send()
            }
            res.send(stage2)
    } catch (e) {
res.status(500).send()
    }
})


module.exports = router