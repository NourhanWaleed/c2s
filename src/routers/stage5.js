const express = require('express')
const {Stage5, schemaText} = require('../models/stage5')
const auth = require('../middleware/auth')
const router = new express.Router()
router.use(auth)

//create stage5
router.post('/stage5', async (req, res) => {
    try {
        const value = await schemaText.validateAsync(req.body);
        const obj = {
            owner: req.user._id,
            ...req.body
        };
        console.log(obj);
        const stage5 = new Stage5(obj);
        
        const logs = new Log({...obj,  data: JSON.stringify(stage5)})
        await stage5.save();
        await logs.save()
        res.status(201).send(stage5)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

//read stage5
router.get('/stage5',async (req, res) =>{
    await Stage5.find({}).then((stage5) =>{
        res.send(stage5)
    }).catch((e) =>{
        console.log(e)
    })
})

router.get('/stage5/:id', async (req, res) => {
    const _id = req.params.id
    await Stage5.findById(_id).then((stage5) =>{
        if(!stage5){
            return res.status(404).send()
        }
        res.send(stage5)
    }).catch((e) =>{
        res.status(500).send()
    })
})

//edit stage5
router.patch('/stage5/:id', async(req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['Wall_Insulation', 'Wall_Measurements', 'Drainage_Plane', 'Siding_put', 'Corner_braces', 'Blockers', 'Measurements_Notes']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try {
        const stage5 = await Stage5.findById(req.params.id)
       updates.forEach((update) => stage5[update] = req.body[update])
       
       const logs = new Log({...obj,  data: JSON.stringify(stage5)})
       await stage5.save()
       await logs.save()
        if(!stage5){
            return res.status(400).send()
        }
        res.send(stage5)
    }catch(e){
        res.status(400).send(e)
    }
})

//delete stage
router.delete('/stage5/:id', async(req, res) => {
    try{
        const stage5 = await Stage5.findByIdAndDelete(req.params.id)
            if(!stage5){
                return res.status(404).send()
            }
            res.send(stage5)
    } catch (e) {
res.status(500).send()
    }
})


module.exports = router