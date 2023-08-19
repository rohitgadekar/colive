const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const User = require('../models/users.js')

module.exports = router

//get all
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
        console.log(users)
    } catch (error) {
        res.json({ message: error.message })
    }
})

// getOne
router.get('/:id', async (req, res) => {
    const users = await User.findOne({ username: req.params.id })
    if (users) {
        res.send(true)
    }
    else
        res.send(false)
})

// getOne
router.get('/get/:id', async (req, res) => {
    const users = await User.findOne({ username: req.params.id })
    if (users) {
        res.send(users)
    }
    else
        res.send(false)
})
// post
router.post('/', async (req, res) => {
    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        password: req.body.password
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.json({ message: error.message })
    }
})
// update
router.patch('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        fname: req.body.fname,
        lname: req.body.lname
    })
    try {
        const newUser = await User.updateOne({ "username": user.username }, { $set: { "fname": user.fname, "lname": user.lname } })

        res.json(newUser)
        // res.send(newUser)
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.patch('/upwd/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    })
    try {
        const newUser = await User.updateOne({ "username": user.username }, { $set: { "password": user.password } })

        res.json(newUser)
        // res.send(newUser)
    } catch (error) {
        res.json({ message: error.message })
    }
})


router.patch('/scheduled/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        fname: req.body.fname,
        lname: req.body.lname,
        phone: req.body.phone,
        date: req.body.date,
        gender: req.body.gender,
        profession: req.body.profession,
        ref: req.body.ref,
        property: req.body.property,
        listedPrice:req.body.listedPrice,
        src:req.body.src,
        time:req.body.time,
        city:req.body.city,
        area:req.body.area
    })
    try {
        
        const newUser = await User.updateOne({ username: user.username }, { $push: { scheduled: { ref: [user.fname, user.lname, user.username, user.phone, user.date, user.gender, user.profession, user.ref, user.property, user.listedPrice, user.src, user.time, user.city, user.area] } } })

        // res.json(newUser)
        res.send(newUser)
    } catch (error) {
        res.json({ message: error.message })
    }
})


router.patch('/reserved/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        fname: req.body.fname,
        lname: req.body.lname,
        phone: req.body.phone,
        date: req.body.date,
        gender: req.body.gender,
        profession: req.body.profession,
        ref: req.body.ref,
        property: req.body.property,
        listedPrice: req.body.listedPrice,
        src: req.body.src,
        time: req.body.time,
        city: req.body.city,
        area: req.body.area
    })
    try {
        const newUser = await User.updateOne({ username: user.username }, { $push: { reserved: { ref: [user.fname, user.lname, user.username, user.phone, user.date, user.gender, user.profession, user.ref, user.property, user.listedPrice, user.src, user.time, user.city, user.area] } } })

        // res.json(newUser)
        res.send(newUser)
    } catch (error) {
        res.json({ message: error.message })
    }
})


router.patch('/del/sc/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        ref: req.body.ref,
    })
    try {
        const newUser = await User.updateOne({ username: user.username }, { $pull: { "scheduled": { "ref": user.ref } } })

        // res.json(newUser)
        res.send(newUser)
    } catch (error) {
        res.json({ message: error.message })
    }
})

router.patch('/del/rs/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        ref: req.body.ref,
    })
    try {
        const newUser = await User.updateOne({ username: user.username }, { $pull: { "reserved": { "ref": user.ref } } })

        // res.json(newUser)
        res.send(newUser)
    } catch (error) {
        res.json({ message: error.message })
    }
})





// // delete
// router.delete('/', async (req, res) => {
//     const user = new User({
//         username: req.body.username
//     })
//     try {
//         const newUser = await User.deleteOne({ "username": user.username })
//         res.status(201).json(newUser)
//     } catch (error) {
//         res.json({ message: error.message })
//     }
// })

