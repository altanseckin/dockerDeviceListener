const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MessageSchema = new Schema ({
    content : String,
    date :Date
})

module.exports = mongoose.model('message',MessageSchema)