const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    }, fname: {
        type: String,
        required: false
    },
    lname: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    profession: {
        type: String,
        required: false
    },
    ref: {
        type: String,
        required: false
    },
    property: {
        type: String,
        required: false
    },
    listedPrice: {
        type: String,
        required: false
    },
    src: {
        type: String,
        required: false
    },
    city: {
        type: String,
        required: false
    },
    area: {
        type: String,
        required: false
    },
    scheduled: [],
    reserved: []

});




module.exports = mongoose.model('users', usersSchema)