const mongoose = require('mongoose')


const reserveSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    profession: {
        type: String,
        required: true
    },
    ref: {
        type: String,
        required: true
    },
    reserved: [String]
});


module.exports = mongoose.model('reserve', reserveSchema)