const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city_id: {
        type: Number,
        required: true
    },
    mealtype_id: {
        type: Number
    },
    min_price: {
        type: Number
    }
})

module.exports = mongoose.model('restaurantSample', restaurantSchema, 'restaurant');