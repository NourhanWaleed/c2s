const express = require('express')
const {Stage6, schemaText} = require('../models/stage6')
const auth = require('../middleware/auth')
const router = new express.Router()
router.use(auth)

//create stage6
router.post('/stage6', async (req, res) => {
    try {
        const value = await schemaText.validateAsync(req.body);
        const obj = {
            owner: req.user._id,
            ...req.body
        };
        console.log(obj);
        const stage6 = new Stage6(obj);

        await stage6.save();
        res.status(201).send(stage6)
    }
    catch (err) {
        res.status(400).send(err)
    }
})



//read stage6
router.get('/stage6',async (req, res) =>{
    await Stage6.find({}).then((stage6) =>{
        res.send(stage6)
    }).catch((e) =>{
        console.log(e)
    })
})

router.get('/stage6/:id', async (req, res) => {
    const _id = req.params.id
    await Stage6.findById(_id).then((stage6) =>{
        if(!stage6){
            return res.status(404).send()
        }
        res.send(stage6)
    }).catch((e) =>{
        res.status(500).send()
    })
})

//edit stage6
router.patch('/stage6/:id', async(req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['Air_Sealing', 'Zonal_Pressure', 'Accu_Vents', 'Finished_Attic', 'Certificateof_Insulation', 'General_Quality_Pictures', 'Pics','Final_Notes','Blower_Door','Nothing_left_behind','Fan_working','Misc_Images','Positive_review']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try {
        const stage6 = await Stage6.findById(req.params.id)
       updates.forEach((update) => stage6[update] = req.body[update])
       await stage6.save()
        if(!stage6){
            return res.status(400).send()
        }
        res.send(stage6)
    }catch(e){
        res.status(400).send(e)
    }
})

//delete stage
router.delete('/stage6/:id', async(req, res) => {
    try{
        const stage6 = await Stage6.findByIdAndDelete(req.params.id)
            if(!stage6){
                return res.status(404).send()
            }
            res.send(stage6)
    } catch (e) {
res.status(500).send()
    }
})


module.exports = router