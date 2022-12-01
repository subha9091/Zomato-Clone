const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    restaurantId: {
        type: String,
        required: true
    },
    price: {
        type: Number
    }
})

module.exports = mongoose.model('MenuItems', restaurantSchema, 'items');