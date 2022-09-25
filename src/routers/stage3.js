const express = require('express')
const {Stage3, schemaText} = require('../models/stage3')
const auth = require('../middleware/auth')
const router = new express.Router()
router.use(auth)

//create stage3
router.post('/stage3', async (req, res) => {
    try {
        const value = await schemaText.validateAsync(req.body);
        const obj = {
            owner: req.user._id,
            ...req.body
        };
        console.log(obj);
        const stage3 = new Stage3(obj);
        
        const logs = new Log({...obj,  data: JSON.stringify(stage3)})
        await stage3.save();
        await logs.save()
        res.status(201).send(stage3)
    }
    catch (err) {
        res.status(400).send(err)
    }
})



//read stage3
router.get('/stage3',async (req, res) =>{
    await Stage3.find({}).then((stage3) =>{
        res.send(stage3)
    }).catch((e) =>{
        console.log(e)
    })
})

router.get('/stage3/:id', async (req, res) => {
    const _id = req.params.id
    await Stage3.findById(_id).then((stage3) =>{
        if(!stage3){
            return res.status(404).send()
        }
        res.send(stage3)
    }).catch((e) =>{
        res.status(500).send()
    })
})

//edit stage3
router.patch('/stage3/:id', async(req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['Air_Sealing', 'Top_plate', 'Wet_Wall', 'Chimney', 'External_Top', 'Bathroom_Fans', 'Gable_Ends','Attic_Access','Basement_Sealed', 'Notes','Air_Sealing_pic']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try {
        const stage3 = await Stage3.findById(req.params.id)
       updates.forEach((update) => stage3[update] = req.body[update])
       
       const logs = new Log({...obj,  data: JSON.stringify(stage3)})
       await stage3.save()
       await logs.save()
        if(!stage3){
            return res.status(400).send()
        }
        res.send(stage3)
    }catch(e){
        res.status(400).send(e)
    }
})

//delete stage
router.delete('/stage3/:id', async(req, res) => {
    try{
        const stage3 = await Stage3.findByIdAndDelete(req.params.id)
            if(!stage3){
                return res.status(404).send()
            }
            res.send(stage3)
    } catch (e) {
res.status(500).send()
    }
})


module.exports = router