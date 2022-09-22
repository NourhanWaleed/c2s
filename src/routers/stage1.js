const express = require('express')
const {Stage1, schema} = require('../models/stage1')
const auth = require('../middleware/auth')
const router = new express.Router()

router.use(auth)

//create stage1
router.post('/stage1', async (req, res) => {
    try {
        const value = await schema.validateAsync(req.body);
        const obj = {
            owner: req.user._id,
            ...req.body
        };
        console.log(obj);
        const stage1 = new Stage1(obj);

        await stage1.save();
        res.status(201).send(stage1)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

//read stage1
router.get('/stage1',async (req, res) =>{
    await Stage1.find({}).then((stage1) =>{
        res.send(stage1)
    }).catch((e) =>{
        console.log(e)
    })
})

router.get('/stage1/:id', async (req, res) => {
    const _id = req.params.id
    await Stage1.findById(_id).then((stage1) =>{
        if(!stage1){
            return res.status(404).send()
        }
        res.send(stage1)
    }).catch((e) =>{
        res.status(500).send()
    })
})

//edit stage1
router.patch('/stage1/:id', async(req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['programType', 'CrewCheif', 'Date_Time', 'Address_Line1', 'City', 'JobID']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try {
        const stage1 = await Stage1.findById(req.params.id)
       updates.forEach((update) => stage1[update] = req.body[update])
       await stage1.save()
        if(!stage1){
            return res.status(400).send()
        }
        res.send(stage1)
    }catch(e){
        res.status(400).send(e)
    }
})

//delete stage
router.delete('/stage1/:id', async(req, res) => {
    try{
        const stage1 = await Stage1.findByIdAndDelete(req.params.id)
            if(!stage1){
                return res.status(404).send()
            }
            res.send(stage1)
    } catch (e) {
res.status(500).send()
    }
})


module.exports = router