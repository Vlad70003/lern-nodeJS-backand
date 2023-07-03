const {Schema, model} = require('mongoose')

const DescriptionUsers = new Schema({
    name: {type: String,  required: true},
    description: {type: String, required: true},
})

module.exports = model('DescriptionUsers', DescriptionUsers);