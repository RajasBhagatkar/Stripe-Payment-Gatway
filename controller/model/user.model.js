const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: "String",
        required: [true, 'username is requried'],
        trim: true,
        unique: true,
    },
    password: {
        type: "String",
        required: [true, 'username is requried']
    }
})

module.exports = mongoose.model('User', userSchema)