const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: Number,
        required: true
    },
    name: {
        type: String
    }
})

module.exports = mongoose.model('userSample', userSchema, 'user');